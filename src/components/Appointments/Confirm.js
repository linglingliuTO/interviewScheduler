
import Button from "components/Button.js";

export default function Confirm(props) {


  return (
    <main className="appointment__card appointment__card--confirm">
  <h1 className="text--semi-bold">Delete the appointment?</h1>
  <section className="appointment__actions">
    <Button danger onClick={props.onCancel} >Cancel</Button>
    <Button danger onClick={props.onDelete}>Confirm</Button>
  </section>
</main>
  );
}