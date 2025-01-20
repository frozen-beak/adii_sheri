"use client";

import { JSX, useState } from "react";
import { Plus, PenSquare } from "lucide-react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import { TodoItem } from "@/components/todo-item";
import { AddTodoModal } from "@/components/add-todo-modal";
import { EditTodoModal } from "@/components/edit-todo-modal";

import type { Todo, TodoPriority, TodoSection } from "@/types/todo";

/**
 * Sections in the Matrix, categorized by priority
 *
 * ### 📝 Each section has:
 *
 *  - unique ID
 *  - title
 *  - color
 *  - an empty list of todos
 */
const initialSections: TodoSection[] = [
  { id: "DO_FIRST", title: "DO FIRST", color: "bg-green-100", todos: [] },
  { id: "DO_LATER", title: "DO LATER", color: "bg-blue-100", todos: [] },
  { id: "DELEGATE", title: "DELEGATE", color: "bg-yellow-100", todos: [] },
  { id: "ELIMINATE", title: "ELIMINATE", color: "bg-red-100", todos: [] },
];

/**
 * # `TodoMatrix`
 *
 * Component to render the todo matrix
 *
 * ## Features:
 *
 * - Add, edit, and delete todos
 * - Toggle todo completion status
 * - Drag and drop todos between priority sections
 *
 * > Remember, Neo! The Matrix has us, but we can bend it to our will.
 * Complete your todos, and you might just break free.
 *
 * @returns {JSX.Element} The Todo Matrix UI
 */
export default function TodoMatrix(): JSX.Element {
  const [sections, setSections] = useState<TodoSection[]>(initialSections);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  /**
   * Handles adding a new [Todo]
   *
   * 📝 The new [Todo] is automatically added to the "DO_FIRST" section
   *
   * @param text - The text content of the new [Todo]
   */
  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority: "DO_FIRST",
    };

    setSections(
      sections.map((section) =>
        section.id === "DO_FIRST"
          ? { ...section, todos: [...section.todos, newTodo] }
          : section
      )
    );
  };

  /**
   * Toggle the completion status of a [Todo]
   *
   * @param todoId - The ID of the [Todo] to toggle
   */
  const handleToggleTodo = (todoId: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        todos: section.todos.map((todo) =>
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        ),
      }))
    );
  };

  /**
   * Delete a [Todo]
   *
   * @param todoId - The ID of the [Todo] to delete
   */
  const handleDeleteTodo = (todoId: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        todos: section.todos.filter((todo) => todo.id !== todoId),
      }))
    );
  };

  /**
   * Open the edit modal for a [Todo]
   *
   * @param todo - The [Todo] to edit
   */
  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  /**
   * Update the text of [Todo]
   *
   * @param id - The ID of the [Todo] to update
   * @param newText - The new text content for the [Todo]
   */
  const handleUpdateTodo = (id: string, newText: string) => {
    setSections(
      sections.map((section) => ({
        ...section,
        todos: section.todos.map((todo) =>
          todo.id === id ? { ...todo, text: newText } : todo
        ),
      }))
    );
  };

  /**
   * Drag-and-Drop logic for reordering [Todo]'s
   *
   * @param result - Result object from the drag-and-drop lib
   */
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const sourceSection = sections.find(
      (section) => section.id === result.source.droppableId
    );
    const destSection = sections.find(
      (section) => section.id === result.destination.droppableId
    );

    if (!sourceSection || !destSection) return;

    const [movedTodo] = sourceSection.todos.splice(result.source.index, 1);
    movedTodo.priority = result.destination.droppableId as TodoPriority;
    destSection.todos.splice(result.destination.index, 0, movedTodo);

    setSections([...sections]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="relative grid h-[calc(100vh-4rem)] grid-cols-2 gap-4">
        <DragDropContext onDragEnd={onDragEnd}>
          {sections.map((section) => (
            <div key={section.id} className={`${section.color} rounded-lg p-4`}>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <PenSquare className="h-5 w-5 text-gray-600" />
              </div>
              <Droppable droppableId={section.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2"
                  >
                    {section.todos.map((todo, index) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        index={index}
                        onToggle={handleToggleTodo}
                        onDelete={handleDeleteTodo}
                        onEdit={handleEditTodo}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>

        {/* Floating "+" button for adding new todos */}
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black p-4 text-white shadow-lg transition-transform hover:scale-110"
        >
          <Plus className="h-6 w-6" />
        </button>
      </div>

      {/* Modal for adding a todo */}
      <AddTodoModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
      />

      {/* Modal for editing a todo */}
      <EditTodoModal
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleUpdateTodo}
        todo={editingTodo}
      />
    </div>
  );
}
