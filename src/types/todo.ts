/**
 * Priority levels for a todo item
 *
 * - ⏹️ `DO_FIRST`: High priority, should be done first
 * - ⏫ `DO_LATER`: Medium priority, can be done later
 * - ⏬ `DELEGATE`: Low priority, can be delegated to someone else
 * - ⏺️ `ELIMINATE`: Very low priority, can be eliminated or ignored
 */
export type TodoPriority = "DO_FIRST" | "DO_LATER" | "DELEGATE" | "ELIMINATE";

/**
 * Todo item
 */
export interface Todo {
  /**
   * Unique id
   */
  id: string;

  /**
   * Text content
   */
  text: string;

  /**
   * Completion status
   */
  completed: boolean;

  /**
   * Priority level
   */
  priority: TodoPriority;
}

/**
 * Todo sections grouped by priority.
 */
export interface TodoSection {
  /**
   * Unique id for the section, matching a `TodoPriority`.
   */
  id: TodoPriority;

  /**
   * Title (e.g., "Do First").
   */
  title: string;

  /**
   * Color code
   */
  color: string;

  /**
   * List of todo's
   */
  todos: Todo[];
}
