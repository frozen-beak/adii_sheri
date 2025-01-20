import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { useState, useEffect, JSX } from "react";

/**
 * Props for `EditTodoModal` component
 */
interface EditTodoModalProps {
  /**
   * Controls the visibility of the modal
   */
  open: boolean;

  /**
   * Callback to trigger when the modal is closed to update the state
   * controlling the modal's visibility
   */
  onClose: () => void;

  /**
   * Callback to trigger when a todo is edited
   *
   * @param id - Unique id of the todo being edited
   * @param newText - The updated text content of the todo
   */
  onEdit: (id: string, newText: string) => void;

  /**
   * The todo item to be edited
   *
   * - Contains the `id` and `text` of the todo
   * - If `null`, the modal will not display any pre-filled text
   */
  todo: { id: string; text: string } | null;
}

/**
 * # `EditTodoModal`
 *
 * A modal dialog component for editing existing todos
 *
 * ## Props:
 *
 * - `open`: Controls whether the modal is visible
 * - `onClose`: Callback to close the modal
 * - `onEdit`: Callback to update the todo with the new text
 * - `todo`: The todo item to be edited (contains `id` and `text`)
 *
 * ## Usage:
 *
 * ```tsx
 * <EditTodoModal
 *   open={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onEdit={(id, newText) => updateTodo(id, newText)}
 *   todo={selectedTodo}
 * />
 * ```
 *
 * @param {EditTodoModalProps} props - The properties passed to the component
 * @returns {JSX.Element} A dialog component for editing todos
 */
export function EditTodoModal({
  open,
  onClose,
  onEdit,
  todo,
}: EditTodoModalProps): JSX.Element {
  const [text, setText] = useState("");

  /**
   * Pre-fill the input field with the current todo text when the modal opens
   */
  useEffect(() => {
    if (todo) {
      setText(todo.text);
    }
  }, [todo]);

  /**
   * Handles the form submission to update the todo
   *
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && todo) {
      onEdit(todo.id, text);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Update todo text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            // Auto focus on the input when the modal opens
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Todo</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
