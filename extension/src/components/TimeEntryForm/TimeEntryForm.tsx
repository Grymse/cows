import { JSX, createSignal, onMount } from "solid-js";
import "./TimeEntryForm.css";

export type TimeEntryFormSubmission = {
  day: string;
  hours: number;
  description: string;
};

type TimeEntryFormProps = {
  onSubmit: (submission: TimeEntryFormSubmission) => void;
};

const getTodayDateString = () => new Date().toISOString().slice(0, 10);

export default function TimeEntryForm({ onSubmit }: TimeEntryFormProps) {
  const [day, setDay] = createSignal("");
  const [hours, setHours] = createSignal("");
  const [description, setDescription] = createSignal("");

  onMount(() => {
    setDay(getTodayDateString());
  });

  const handleSubmit: JSX.EventHandlerUnion<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();

    const dayValue = day().trim();
    const hoursValue = Number(hours());
    const descriptionValue = description().trim();

    if (!dayValue || !descriptionValue || Number.isNaN(hoursValue)) {
      return;
    }

    onSubmit({
      day: dayValue,
      hours: hoursValue,
      description: descriptionValue,
    });

    setHours("");
    setDescription("");
    setDay(getTodayDateString());
  };

  return (
    <form class="time-entry-form" onSubmit={handleSubmit}>
      <input type="date" required aria-label="Day" value={day()} onInput={(event) => setDay(event.currentTarget.value)} />
      <input
        type="number"
        step="0.25"
        min="0"
        required
        placeholder="Hours"
        aria-label="Hours"
        value={hours()}
        onInput={(event) => setHours(event.currentTarget.value)}
      />
      <input
        type="text"
        required
        maxlength={200}
        placeholder="Description / project"
        aria-label="Description"
        value={description()}
        onInput={(event) => setDescription(event.currentTarget.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
