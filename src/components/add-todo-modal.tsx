import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/ui/dialog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";

import { JSX, useState } from "react";

/**
 * Props for the `AddTodoModal` component
 */
interface AddTodoModalProps {
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
   * Callback to trigger when a new todo is added
   *
   * @param text - The text content of the new todo
   */
  onAdd: (text: string) => void;
}

/**
 * # `AddTodoModal`
 *
 * A modal component for adding new todos
 *
 * ## Props:
 *
 * - `open`: Controls whether the modal is visible
 * - `onClose`: Callback to close the modal
 * - `onAdd`: Callback to add a new todo with the entered text
 *
 * ## Usage:
 *
 * ```tsx
 * <AddTodoModal
 *   open={isModalOpen}
 *   onClose={() => setIsModalOpen(false)}
 *   onAdd={(text) => addTodo(text)}
 * />
 * ```
 *
 * @param {AddTodoModalProps} props - The properties passed to the component
 * @returns {JSX.Element} A dialog component for adding todos
 */
export function AddTodoModal({
  open,
  onClose,
  onAdd,
}: AddTodoModalProps): JSX.Element {
  const [text, setText] = useState("");

  /**
   * Handles the form submission to add new todo
   *
   * @param e - The form submission event
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);

      // 📝 Reset current state for when the model is opened again
      setText("");

      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Todo</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="What needs to be done?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            // Auto focus on the input when the modal opens
            autoFocus
          />
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Todo</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
