import { Accessor, For } from "solid-js";
import type { TimeEntryFormSubmission } from "../TimeEntryForm/TimeEntryForm";
import "./TimeEntries.css";

export type TimeEntry = { id: number } & TimeEntryFormSubmission;

type TimeEntriesProps = {
  entries: Accessor<TimeEntry[]>;
  onDelete: (id: number) => void;
};

export default function TimeEntries({ entries, onDelete }: TimeEntriesProps) {
  return (
    <table aria-label="Time entries">
    <thead>
        <tr>
        <th class="col-day">Day</th>
        <th class="col-hours">Hours</th>
        <th>Description</th>
        <th class="col-action">Action</th>
        </tr>
    </thead>
    <tbody>
        <For each={entries()}>
        {(entry) => (
            <tr>
            <td>{entry.day}</td>
            <td>{entry.hours}</td>
            <td>{entry.description}</td>
            <td class="action-cell">
                <button
                type="button"
                class="delete-btn"
                aria-label="Delete entry"
                onClick={() => onDelete(entry.id)}
                >
                Delete
                </button>
            </td>
            </tr>
        )}
        </For>
    </tbody>
    </table>
  );
}
