import { JSX } from "react";
import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";

import type { Todo } from "@/types/todo";
import { Draggable } from "@hello-pangea/dnd";

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
          className="group flex items-start justify-between rounded-lg bg-white/50 p-3 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <motion.div
              className="relative h-5 w-5 flex-shrink-0"
              initial={false}
              animate={todo.completed ? "checked" : "unchecked"}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-gray-300"
                variants={{
                  checked: { borderColor: "#3b82f6", background: "#3b82f6" },
                  unchecked: { borderColor: "#d1d5db", background: "white" },
                }}
                transition={{ duration: 0.2 }}
              />
              <motion.svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 24 24"
                variants={{
                  checked: { opacity: 1, scale: 1 },
                  unchecked: { opacity: 0, scale: 0.8 },
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.path
                  d="M5 13l4 4L19 7"
                  fill="none"
                  stroke="white"
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={{
                    checked: { pathLength: 1 },
                    unchecked: { pathLength: 0 },
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.svg>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </motion.div>
            <motion.span
              animate={{
                color: todo.completed ? "#9ca3af" : "#000000",
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              transition={{ duration: 0.2 }}
              className="max-h-[4.5em] overflow-hidden text-ellipsis line-clamp-3"
            >
              {todo.text}
            </motion.span>
          </div>
          <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100 self-start mt-0.5">
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
