import { Accessor, Show } from "solid-js";
import "./StatusBar.css";

export type ErrorBarProps = {
  errorMessage: Accessor<string | null>;
};

export default function ErrorBar({ errorMessage }: ErrorBarProps) {
  return (
    <Show when={errorMessage()}>
      <div class="error-bar" role="alert" aria-live="polite">
        {errorMessage()}
      </div>
    </Show>
  );
}
