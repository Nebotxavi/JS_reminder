import { useState } from "react";
import { getData } from "./data/getData";
import "./App.css";
import { useSpinDelay } from "./hooks/useSpinDelay";

interface FormData {
  fetchDelay: number;
  shouldFail: boolean;
  spinDelay?: number;
}

const initialFormData: FormData = {
  fetchDelay: 0,
  shouldFail: false,
  spinDelay: 200,
};

// BASIC COMPONENT TO SHOW useSpinDelay

function App() {
  const [loadingRaw, setLoadingRaw] = useState<boolean>(false);
  const [loadingWithSpinDelay, setLoadingWithSpinDelay] =
    useState<boolean>(false);
  const [dataRaw, setDataRaw] = useState<string>("");
  const [dataWithSpinDelay, setDataWithSpinDelay] = useState<string>("");
  const [errorWithSpinDelay, setErrorWithSpinDelay] = useState<string>("");
  const [errorRaw, setErrorRaw] = useState<string>("");
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const fetchData = async (
    loadingSetter: (value: React.SetStateAction<boolean>) => void,
    dataSetter: (value: React.SetStateAction<string>) => void,
    errorSetter: (value: React.SetStateAction<string>) => void
  ) => {
    try {
      loadingSetter(true);
      errorSetter("");
      const { data } = await getData(formData.fetchDelay, formData.shouldFail);
      dataSetter(data);
    } catch (err) {
      console.error(err);
      errorSetter((err as Error).message);
      dataSetter("");
    } finally {
      loadingSetter(false);
    }
  };

  const cleanData = () => {
    setDataWithSpinDelay("");
    setLoadingWithSpinDelay(false);
    setDataRaw("");
    setLoadingRaw(false);
    setErrorWithSpinDelay("");
    setErrorRaw("");
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const fetchDelay = Number(formData.get("fetchDelay"));
    const shouldFail = formData.get("shouldFail") === "on";
    const spinDelay = Number(formData.get("spinDelay"));

    setFormData((prev) => ({
      ...prev,
      fetchDelay: fetchDelay ?? prev.fetchDelay,
      shouldFail: shouldFail ?? prev.shouldFail,
      spinDelay: spinDelay ?? prev.spinDelay,
    }));
  };

  return (
    <main className="demo">
      <section className="demo__header">
        <h1>UseSpinDelay</h1>
      </section>

      <section className="demo__content">
        <article className="demo__form-section">
          <Form handleForm={handleForm} formData={formData} />
        </article>

        <div className="demo__sections">
          <section className="demo__section">
            <button
              className="demo__button"
              onClick={() =>
                fetchData(
                  setLoadingWithSpinDelay,
                  setDataWithSpinDelay,
                  setErrorWithSpinDelay
                )
              }
            >
              UseSpinDelay fetch with {formData.fetchDelay}ms delay
            </button>
            {dataWithSpinDelay && <p>{dataWithSpinDelay}</p>}
            {errorWithSpinDelay && <Error message={errorWithSpinDelay} />}
            {useSpinDelay(loadingWithSpinDelay, formData.spinDelay) && (
              <Loading />
            )}
          </section>

          <section className="demo__section">
            <button
              className="demo__button"
              onClick={() => fetchData(setLoadingRaw, setDataRaw, setErrorRaw)}
            >
              Raw fetch with {formData.fetchDelay}ms delay
            </button>
            {dataRaw && <p>{dataRaw}</p>}
            {errorRaw && <Error message={errorRaw} />}
            {loadingRaw && <Loading />}
          </section>
        </div>

        <div className="demo__actions">
          <button onClick={cleanData}>Clean data</button>
        </div>
      </section>
    </main>
  );
}

function Error({ message }: { message: string }) {
  return (
    <p>
      <span
        style={{
          fontFamily: "Apple Color Emoji, Segoe UI Emoji, Noto Color Emoji",
        }}
      >
        ❌
      </span>{" "}
      {message}
    </p>
  );
}

function Loading() {
  return (
    <div className="loading">
      <p>Loading...</p>
    </div>
  );
}

function Form({
  handleForm,
  formData,
}: {
  handleForm: (e: React.FormEvent<HTMLFormElement>) => void;
  formData: FormData;
}) {
  return (
    <form className="form" onSubmit={(e) => handleForm(e)}>
      <fieldset className="form__group">
        <div className="form__item form__item--inline">
          <label htmlFor="fetchDelay">Delay (ms) </label>
          <input type="number" id="fetchDelay" name="fetchDelay" />
        </div>

        <div className="form__item form__item--inline">
          <label htmlFor="spinDelay">Spin delay (ms) </label>
          <input
            type="number"
            id="spinDelay"
            name="spinDelay"
            defaultValue={formData.spinDelay}
          />
        </div>
        <div className="form__item">
          <input type="checkbox" id="shouldFail" name="shouldFail" />
          <label htmlFor="shouldFail">Should fail</label>
        </div>
        <div className="form__item">
          <button type="submit">Submit</button>
        </div>
      </fieldset>
    </form>
  );
}

export default App;
