import { AnalysisResult, FeedbackSubmission, SavedReport } from '../types';

function getReportsKey(userId: string): string {
  return `fintrust_user_${userId}_saved_reports`;
}

function getFeedbackKey(userId: string): string {
  return `fintrust_user_${userId}_feedback_list`;
}

function getAnalysisCountKey(userId: string): string {
  return `fintrust_user_${userId}_analysis_count`;
}

/**
 * Returns saved reports strictly isolated for the provided user ID.
 */
export function getUserSavedReports(userId: string): SavedReport[] {
  try {
    const raw = localStorage.getItem(getReportsKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Saves a report for the specific user.
 */
export function saveUserReport(userId: string, analysis: AnalysisResult, notes?: string): SavedReport {
  const existing = getUserSavedReports(userId);
  const newReport: SavedReport = {
    id: 'SAVED-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    userId,
    analysis,
    savedAt: new Date().toISOString(),
    notes
  };

  const updated = [newReport, ...existing];
  try {
    localStorage.setItem(getReportsKey(userId), JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save report', err);
  }
  return newReport;
}

/**
 * Deletes a saved report belonging to the user.
 */
export function deleteUserReport(userId: string, reportId: string): boolean {
  const existing = getUserSavedReports(userId);
  const filtered = existing.filter(r => r.id !== reportId);
  try {
    localStorage.setItem(getReportsKey(userId), JSON.stringify(filtered));
    return true;
  } catch {
    return false;
  }
}

/**
 * Submits feedback for an analysis, isolated to user account.
 */
export function submitUserFeedback(
  userId: string,
  wasHelpful: 'yes' | 'somewhat' | 'no',
  accuracyAssessment: 'accurate' | 'false_positive' | 'false_negative' | 'unsure',
  comments: string,
  postSnippet: string,
  reportId?: string
): FeedbackSubmission {
  const submission: FeedbackSubmission = {
    id: 'FB-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    userId,
    reportId,
    postSnippet,
    wasHelpful,
    accuracyAssessment,
    comments,
    submittedAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem(getFeedbackKey(userId));
    const list: FeedbackSubmission[] = raw ? JSON.parse(raw) : [];
    list.unshift(submission);
    localStorage.setItem(getFeedbackKey(userId), JSON.stringify(list));
  } catch (err) {
    console.error('Failed to submit feedback', err);
  }

  return submission;
}

export function getUserFeedback(userId: string): FeedbackSubmission[] {
  try {
    const raw = localStorage.getItem(getFeedbackKey(userId));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Increment and get the count of posts analyzed by this user.
 */
export function incrementUserAnalysisCount(userId: string): number {
  try {
    const current = getUserAnalysisCount(userId);
    const updated = current + 1;
    localStorage.setItem(getAnalysisCountKey(userId), updated.toString());
    return updated;
  } catch {
    return 1;
  }
}

export function getUserAnalysisCount(userId: string): number {
  try {
    const raw = localStorage.getItem(getAnalysisCountKey(userId));
    if (!raw) return 0;
    const parsed = parseInt(raw, 10);
    return isNaN(parsed) ? 0 : parsed;
  } catch {
    return 0;
  }
}
