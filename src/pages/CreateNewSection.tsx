import styles from './index.less';
import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { connect } from 'umi';
import 'antd/dist/antd.css';


function CreateNewSection(props: any) {
  const {modal, showModal, handleOk, handleCancel, sections} = props;

  const [newSection, setNewSection] = useState('');
  const [upSection, setUpSection] = useState('');
  const [newNameSection, setNewNameSection] = useState('');
  const [delSection, setDelSection] = useState('');
  const upSections = [{name: '---'}, ...sections];

  const addNewSection = (newSection: string) => {
    props.addSections(newSection);
    setNewSection('')
  }

  const renameSect = (upSection: any, newNameSection: any) => {
    let data = [upSection, newNameSection];
    props.renameSection(data);
    setNewNameSection('');
    setUpSection('');
  }

  const delThisSection = (name: string) => {
    props.deleteSection(name);
    setDelSection('');
  }
  return (
    <Modal title="Work with sections" visible={modal} onOk={handleOk} onCancel={handleCancel}>
      <span style={{fontSize: 20}}>Create a new section:</span>
      <input className={styles.input} value={newSection} placeholder={'Add a new section'}
             onChange={(e) => setNewSection(e.target.value)}/><br/>
      <button disabled={!newSection} className={styles.button3} onClick={() => addNewSection(newSection)}>Save new section</button>&nbsp;&nbsp;
      <br/>
      <hr/>
      <span style={{fontSize: 20}}>Update section:</span>
      <input className={styles.input}  value={upSection} onChange={(e)=>setUpSection(e.target.value)} placeholder={'Choose section for rename'}/>&nbsp;&nbsp;
      <select className={styles.input50} value={upSection} onChange={(e)=>setUpSection(e.target.value)}>{upSections.map(el => <option>{el.name}</option>)}
      </select><br/>
      <span>Choose new name:</span>
      <input className={styles.input}  value={newNameSection} onChange={(e)=>setNewNameSection(e.target.value)} placeholder={'Put a new name for section'}/>
      <button disabled={!newNameSection} className={styles.button3} onClick={() => renameSect(upSection, newNameSection)}>Update section</button>&nbsp;&nbsp;
      <hr/>
      <span style={{fontSize: 20}}>Delete section:</span>
      <input className={styles.input}  value={delSection} onChange={(e)=>setDelSection(e.target.value)} placeholder={'Choose section to delete'}/>&nbsp;&nbsp;
      <select className={styles.input50} value={delSection} onChange={(e)=>setDelSection(e.target.value)}>{upSections.map(el => <option>{el.name}</option>)}
      </select><br/>
      <button disabled={!delSection} className={styles.button3} onClick={() => delThisSection(delSection)}>Delete section</button>&nbsp;&nbsp;
      {/*<button className={styles.button2} onClick={()=>showModal()}>Close</button>*/}
    </Modal>
  )
}

  const mapStateToProps = (state: any) => ({
    tasks: state.Data.tasks,
    sections: state.Data.section
  });

  const mapDispatchToProps = (dispatch: any) => ({
    addSections: (payload: { newSection: string }) => dispatch({type: "Data/addSection", payload}),
    renameSection: (payload: { data: any }) => dispatch({type: "Data/renameSection", payload}),
    deleteSection: (payload: { name: string }) => dispatch({type: "Data/deleteSection", payload})
  });

  export default connect(mapStateToProps, mapDispatchToProps)(CreateNewSection);
