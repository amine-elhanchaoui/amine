import Form from "react-bootstrap/Form";

export default function TaskStatue({ status = 'notyet', onChange = () => {} }){
  return (
    <Form>
      <div className="d-flex gap-3 align-items-center">
        <Form.Check
          type="radio"
          label="✅ Done"
          name="taskStatus"
          id={`done-${Math.random()}`}
          value="done"
          checked={status === "done"}
          onChange={() => onChange('done')}
        />

        <Form.Check
          type="radio"
          label="⏳ Not Yet"
          name="taskStatus"
          id={`notyet-${Math.random()}`}
          value="notyet"
          checked={status === "notyet"}
          onChange={() => onChange('notyet')}
        />
      </div>
    </Form>
  )
}