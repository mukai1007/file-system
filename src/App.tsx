import React, { useState } from "react";
import Folder from "@scena/react-folder";
import { Button } from 'antd'
import { AiOutlineFolder } from 'react-icons/ai';

import FileComponent from "./components/FileComponent";
import { foldersAndFiles, iconsByExtension } from './assets/constants'

import '../src/style.css'

interface Info {
  id: string;
  name: string;
  type: string;
  icon: {};
  children: Info[];
}

function App() {
  const [infos, setInfos] = useState<Info[]>(foldersAndFiles);
  const [selected, setSelected] = useState<string[]>([]);
  console.log(selected);
  
  const [folded, setFolded] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('')

  const createFolder = () => {
    const type = inputValue.split('.').pop()?.toLowerCase() || ''

    const isNameExist = infos.some(info => info.name === inputValue.toLowerCase().trim())
    if(isNameExist) {
      alert(`${type ? 'Файл' : 'Папка'} с таким именем уже существует! Выберите другое название.`)
      return
    }
    const id = Date.now()

    const newFolder = {
      id: String(id),
      name: inputValue,
      type: type ? 'file' : 'folder',
      icon: iconsByExtension[type] || <AiOutlineFolder />,
      children: []
    }

    if (selected.length > 0) {
      const parentId = String(selected[0]);
      const parentInfo = infos.find(info => info.id === parentId);
      
      parentInfo?.children.push(newFolder)
      setInfos([...infos]);
    } else {
      setInfos([newFolder, ...infos]);
    }
    setInputValue('')
  }
  
  const handleMove = (e: any) => {
    const selectedInfos = e.selectedInfos;
    
    const targetInfo = e.parentInfo;
    if (targetInfo && targetInfo.info.type === "file") {
      // Если перемещаем папку на файл, не выполняем перемещение
      return;
    }
    selectedInfos.forEach((info: any) => {
      const parentInfo = info.parentInfo;
      const children = parentInfo ? parentInfo.children : infos;
      
      
      children.splice(children.indexOf(info.info), 1);
      
    });
    if (targetInfo) {
      targetInfo.info.children = e.children;
      setInfos([...infos]);
    } else {
      setInfos([...e.children]);
    }
  }

  function deleteItem(id: string, items: any) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items.splice(i, 1);
        break;
      } else if (items[i].children && items[i].children.length > 0) {
        deleteItem(id, items[i].children);
      }
    }
    return setInfos([...items]);
  }

  const handleDeleteClick = () => {
    selected ? deleteItem(selected[0], infos) : ''
  };
  

  return (
    <div className="App">
      <div className="form">  
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? createFolder() : null}
        />
        <Button type="primary" onClick={() => createFolder()} disabled={inputValue === ''}>Создать</Button>
        <Button danger onClick={handleDeleteClick} disabled={selected.length === 0 || infos.length === 0}>Удалить</Button>
      </div>

      {!infos.length 
      ? <h1>Пока все пусто. Создайте новую.</h1>
      : <Folder<Info>
          infos={infos}
          FileComponent={FileComponent}
          nameProperty="name"
          childrenProperty="children"
          selected={selected}
          folded={folded}
          multiselect={true}
          selectedColor="rgba(108, 122, 137)"
          isPadding={false}
          isMove={true}
          showFoldIcon={true}
          borderColor="inherit"
          idProperty={"id"}
          pathProperty={"id"}
          onMove={handleMove}
          onFold={(e) => setFolded(e.folded)}
          onSelect={(e) => setSelected(e.selected)}
        />
      }
    </div>
  );
}

export default App;