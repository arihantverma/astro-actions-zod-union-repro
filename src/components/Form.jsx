import { actions } from "astro:actions";

export function Form() {
  function handleSubmitZodUnionAction(event, type) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("type", type);
    actions.sendFormDataUnion(formData);
  }

  function handleSubmitZodObject(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("type", "only-first-name");

    actions.sendFormObject(formData);
  }

  return (
    <>
      <div>
        <h2>Union: Only Fill Firstname</h2>
        <form
          onSubmit={(event) => {
            handleSubmitZodUnionAction(event, "only-first-name");
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            gap: 12,
          }}
        >
          <Label id="firstname">First Name</Label>
          <button type="submit">Submit</button>
        </form>
      </div>

      <p>OR</p>

      <div>
        <h2>Union: Tell us who you are</h2>
        <form
          onSubmit={(event) => {
            handleSubmitZodUnionAction(event, "full");
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            gap: 8,
          }}
        >
          <Label id="firstname">First Name</Label>
          <Label id="lastname">Last Name</Label>
          <Label id="age" type="number">
            Age
          </Label>
          <button type="submit">Submit</button>
        </form>
      </div>

      <div>
        <h2>Object: Only Firstname</h2>
        <form
          onSubmit={handleSubmitZodObject}
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            gap: 8,
          }}
        >
          <Label id="first_name">First Name</Label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
}

function Label(props) {
  const { children, type = "text", id } = props;
  return (
    <label
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        fontSize: "0.825rem",
      }}
    >
      {children}
      <input type={type} id={id} name={id} />
    </label>
  );
}
