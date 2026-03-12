import { createSignal } from "solid-js";
import Loader from "./components/Loader/Loader";
import ErrorBar from "./components/ErrorBar/ErrorBar";
import TimeEntries from "./components/TimeEntries/TimeEntries";
import type { TimeEntry } from "./components/TimeEntries/TimeEntries";
import User, { SignedInUser } from "./components/User/User";
import TimeEntryForm from "./components/TimeEntryForm/TimeEntryForm";
import type { TimeEntryFormSubmission } from "./components/TimeEntryForm/TimeEntryForm";

const initialEntries: TimeEntry[] = [
  { id: 1, day: "2026-03-11", hours: 2.5, description: "Project Atlas" },
  {
    id: 2,
    day: "2026-03-10",
    hours: 4,
    description: "Project Atlas fdsa fdsa fdsa Project Atlas fdsa fdsa fdsa Project Atlas fdsa fdsa fdsa",
  },
  { id: 3, day: "2026-03-09", hours: 1.75, description: "Project Nova" },
  { id: 4, day: "2026-03-08", hours: 3, description: "Project Nova" },
];

export default function App() {
  const [user, setUser] = createSignal<SignedInUser>({
    name: "Signed in user",
    email: "user@example.com",
    logoUrl: "https://dev.azure.com/favicon.ico",
  });
  const [errorMessage, setErrorMessage] = createSignal<string | null>("The request did not go well. You need to fill out the form such that this and that is well prepared");
  const [isLoading, setIsLoading] = createSignal(false);
  const [entries, setEntries] = createSignal<TimeEntry[]>(initialEntries);
  const totalHours = () => entries().reduce((sum, entry) => sum + entry.hours, 0);

  let nextId = 5;

  const handleSubmit = (submission: TimeEntryFormSubmission) => {
    setEntries((current) => [
      {
        id: nextId,
        ...submission,
      },
      ...current,
    ]);
    nextId += 1;
  };

  const deleteEntry = (id: number) => {
    setEntries((current) => current.filter((entry) => entry.id !== id));
  };

  return (
    <>
      <div class="app">
        <Loader isLoading={isLoading} />
        <ErrorBar errorMessage={errorMessage} />
        <User user={user} totalHours={totalHours} />
        <TimeEntryForm onSubmit={handleSubmit} />
        <TimeEntries entries={entries} onDelete={deleteEntry} />
      </div>
    </>
  );
}