import { Trash2, Edit } from "lucide-react";
import type { Todo } from "@/types/todo";
import { Draggable } from "@hello-pangea/dnd";
import { JSX } from "react";

/**
 * Props for `TodoItem` component
 *
 * > `Morpheus`: 'I can only show you the door. You’re the one who has to cross it... and finish your todos.'
 */
interface TodoItemProps {
  /**
   * The [Todo] item to be displayed
   */
  todo: Todo;

  /**
   * The index of the todo item in the list
   *
   * 📝 The index is used for drag-and-drop ordering
   */
  index: number;

  /**
   * Callback to trigger when the todo's completion status is toggled
   *
   * @param id - Unique id of the todo
   */
  onToggle: (id: string) => void;

  /**
   * Callback to trigger when a todo is deleted
   *
   * @param id - Unique id of the todo
   */
  onDelete: (id: string) => void;

  /**
   * Callback to trigger when a todo is edited
   *
   * @param todo - The todo item being edited
   */
  onEdit: (todo: Todo) => void;
}

/**
 * # `TodoItem`
 *
 * A draggable todo item
 *
 * ## Props:
 *
 * - `todo`: The todo item to be displayed
 * - `index`: The index of the todo in the list (used for drag-and-drop)
 * - `onToggle`: Callback to toggle the todo's completion status
 * - `onDelete`: Callback to delete the todo
 * - `onEdit`: Callback to edit the todo
 *
 * ## Usage:
 *
 * ```tsx
 * <TodoItem
 *   todo={todo}
 *   index={index}
 *   onToggle={(id) => toggleTodo(id)}
 *   onDelete={(id) => deleteTodo(id)}
 *   onEdit={(todo) => editTodo(todo)}
 * />
 * ```
 *
 * @param {TodoItemProps} props - The properties passed to the component
 * @returns {JSX.Element} A draggable todo item component
 */
export function TodoItem({
  todo,
  index,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps): JSX.Element {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group flex items-center justify-between rounded-lg bg-white/50 p-3 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border-2 border-gray-300 transition-colors checked:border-blue-500 checked:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              />
              <svg
                className="pointer-events-none absolute left-0.5 top-0.5 h-4 w-4 fill-none stroke-white stroke-2 opacity-0 transition-opacity peer-checked:opacity-100"
                viewBox="0 0 24 24"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span
              className={todo.completed ? "text-gray-500 line-through" : ""}
            >
              {todo.text}
            </span>
          </div>
          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
            <button onClick={() => onEdit(todo)}>
              <Edit className="h-5 w-5 text-gray-500 hover:text-blue-500" />
            </button>
            <button onClick={() => onDelete(todo.id)}>
              <Trash2 className="h-5 w-5 text-gray-500 hover:text-red-500" />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  );
}
