import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
//import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import FirstLevel from './components/FirstLevel/FirstLevel'

type Child = {
  type: string,
  allocation : number
  childs?: Child[]
}


function App() {
  const [addItem, setAddItem] = useState<Child>()
  const [deleteItem, setDeleteItem] = useState<Child>()

  const [type, setType] = useState('')
  const [allocation, setAllocation] = useState(0)

  const [dataOfEmployes, setDataEmployes] = useState({
      "type": "Manager A",
      "allocation": 300,
      "childs": [
        {
          "type" : "Manager B",
          "allocation": 300,
          "childs": [
            {
              "type": "Developer",
              "allocation": 1000
            },
            {
              "type": "QA Tester",
              "allocation": 500
            }
          ]
        },
        {
          "type" : "Manager C",
          "allocation": 300,
          "childs": []
        }
      ]
  })

  const addItemtoArray = (position: number) => {
    dataOfEmployes.childs[position].childs.push({
      "type": type,
      "allocation": allocation
    })

    setDataEmployes(dataOfEmployes)
    setType('')
    setAllocation(0)
  }

  const deleteIteminArray = (positionChild: number, positionFather: number) => {
    console.log({positionFather})
    console.log({positionChild})
    dataOfEmployes.childs[positionFather].childs.splice(positionChild, 1)
    setDataEmployes(dataOfEmployes)
    setDeleteItem(dataOfEmployes.childs[positionFather].childs[positionChild])
  }

  useEffect(() => {
    console.log(dataOfEmployes)
  }, [dataOfEmployes, type, allocation, deleteItem])
  
  const showLevels = (items: Child[], classF: string, classS: string) => {
    if (items.length > 0) {
      return items.map((item, i) => (
        <h2 key={i} className={classF}>+<span className={`badge ${classS}`}>{`${item.type} $${item.allocation}`}</span></h2>
      ))
    }
    return <h2>No hay items</h2>
  }

  return (
    <div className="App">
      <FirstLevel title={dataOfEmployes.type} allocation={dataOfEmployes.allocation} classSon="badge text-bg-dark"/>
      {dataOfEmployes?.childs.map((item, index) => (<>
          <FirstLevel title={item.type} allocation={item.allocation} classFather="ms-3" classSon="badge text-bg-primary"/> 
          <a onClick={() => addItemtoArray(index)}>add</a>
          <div className="input-group mb-3 w-25">
            <input type="text" className="form-control" placeholder="Type" aria-label="Type" aria-describedby="basic-addon1" onChange={e => setType(e.target.value)}/>
            <input type="number" className="form-control" placeholder="Allocation" aria-label="Allocation" aria-describedby="basic-addon1" onChange={e => setAllocation(parseInt(e.target.value))}/>
          </div>
          
          
          
          {item?.childs?.map((subItem, indexChild) => (<>
            <FirstLevel title={subItem.type} allocation={subItem.allocation} classFather="ms-5" classSon="badge text-bg-info"/>
            <a onClick={() => deleteIteminArray(indexChild, index)}>delete</a>
          </>))}
      </>))}

      {/*showLevels(dataOfEmployes?.childs, "ms-3", "badge text-bg-primary")*/}
    </div>
  );
}

export default App;
