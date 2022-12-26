import { Button, Popover } from "react-bootstrap";

const PopoverCustom = (index: number, setType: Function, setAllocation: Function, addItemtoArray: Function) => {
  return (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Add role position</Popover.Header>
      <Popover.Body>
        
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            aria-label="Type"
            aria-describedby="basic-addon1"
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="number"
            className="form-control"
            placeholder="Allocation"
            aria-label="Allocation"
            aria-describedby="basic-addon1"
            onChange={(e) => setAllocation(parseInt(e.target.value))}
          />
          <Button onClick={() => addItemtoArray(index)}>save</Button>
        </div>
      </Popover.Body>
    </Popover>
  )
}

export default PopoverCustom