import TodoMatrix from "@/features/todo-matrix";
import { JSX } from "react";

/**
 * # `Home`
 *
 * [TodoMatrix] served on default route -> `/`
 *
 * You take the blue pill, the story ends. You take the red pill, you stay in Todo-land,
 * and I show you how deep the productivity rabbit hole goes.
 *
 * @returns {JSX.Element} Homepage
 */
export default function Home(): JSX.Element {
  return <TodoMatrix />;
}
