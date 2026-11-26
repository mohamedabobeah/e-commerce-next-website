import { LuCheck, LuKeyRound, LuLock, LuMail } from "react-icons/lu";

const steps = [{ icon: LuMail }, { icon: LuKeyRound }, { icon: LuLock }];

export default function AuthStepper({ step }: { step: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center justify-center gap-2" aria-label="Progress">
      {steps.map((item, index) => {
        const number = index + 1;
        const done = number < step;
        const active = number === step;

        return (
          <li key={number} className="flex items-center gap-2">
            <span
              aria-current={active ? "step" : undefined}
              className={`flex size-9 items-center justify-center rounded-full text-sm ${
                done || active
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-400"
              } ${active ? "ring-4 ring-green-100" : ""}`}
            >
              {done ? <LuCheck /> : <item.icon />}
            </span>

            {number < steps.length && (
              <span
                className={`h-0.5 w-8 ${done ? "bg-green-600" : "bg-gray-200"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}