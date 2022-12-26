import { useState, useEffect } from "react";
import FirstLevel from "./components/FirstLevel/FirstLevel";
import { Button, OverlayTrigger } from "react-bootstrap";
import { Child } from "./interfaces/index"
import PopoverCustom from "./components/Popover/Popover";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

function App() {
  const [deleteItem, setDeleteItem] = useState<Child>();
  const [type, setType] = useState("");
  const [allocation, setAllocation] = useState(0);
  let total = 0;

  const [dataOfEmployes, setDataEmployes] = useState({
    type: "Manager A",
    allocation: 300,
    childs: [
      {
        type: "Manager B",
        allocation: 300,
        childs: [
          {
            type: "Developer",
            allocation: 1000,
          },
          {
            type: "QA Tester",
            allocation: 500,
          },
        ],
      },
      {
        type: "Manager C",
        allocation: 300,
        childs: [],
      },
    ],
  });

  const addItemtoArray = (position: number) => {
    dataOfEmployes.childs[position].childs.push({
      type: type,
      allocation: allocation,
    });

    setDataEmployes(dataOfEmployes);
    setType("");
    setAllocation(0);
  };

  const deleteIteminArray = (positionChild: number, positionFather: number) => {
    setDeleteItem(dataOfEmployes.childs[positionFather].childs[positionChild]);
    dataOfEmployes.childs[positionFather].childs.splice(positionChild, 1);
    setDataEmployes(dataOfEmployes);
  };

  useEffect(() => {}, [dataOfEmployes, type, allocation, deleteItem]);

  const getTotalAmount = (data: Child) => {
    total += data.allocation;
    data.childs?.map((item: any) => {
      getTotalAmount(item);
    });
    return total;
  };

  return (
    <div className="App">
      <FirstLevel
        title={dataOfEmployes.type}
        allocation={dataOfEmployes.allocation}
        classSon="badge text-bg-dark"
      />
      {dataOfEmployes?.childs.map((item, index) => (
        <div key={index}>
          <div className="second-level">
            <FirstLevel
              title={item.type}
              allocation={item.allocation}
              classFather="ms-3"
              classSon="badge text-bg-primary"
            />
            <OverlayTrigger trigger="click" placement="right" overlay={PopoverCustom(index, setType, setAllocation, addItemtoArray)}>
              <a aria-label="add-btn"><Button variant="outline-success">+</Button></a>
            </OverlayTrigger>
          </div>
          

          {item?.childs?.map((subItem, indexChild) => (
              <div className="third-level container" key={`${index}_${indexChild}`}>
                <FirstLevel
                  title={subItem.type}
                  allocation={subItem.allocation}
                  classFather="ms-5"
                  classSon="badge text-bg-info"
                />
                <Button variant="outline-danger" onClick={() => deleteIteminArray(indexChild, index)}>delete</Button>
              </div>
          ))}
        </div>
      ))}

      <h2>Total: {getTotalAmount(dataOfEmployes)}</h2>
    </div>
  );
}

export default App;
