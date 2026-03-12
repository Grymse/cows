import { Accessor, Show } from "solid-js";
import "./Loader.css";

export type LoaderProps = {
    isLoading: Accessor<boolean>
};

export default function Loader({isLoading}: LoaderProps) {
  return (
    <Show when={isLoading()}>
        <div class="loading-overlay" aria-hidden="false">
            <div class="loading-spinner" role="status" aria-label="Loading"></div>
        </div>
    </Show>
  );
}