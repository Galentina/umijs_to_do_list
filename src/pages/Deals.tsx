import styles from './index.less';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'umi';
import React from 'react';
import List from '@/pages/List';




function Deals(props: any) {
  const {tasks, section} = props;

  return (
    <div >
      <h5><span className={styles.span1}>{section.name}</span>&nbsp;&#10155;&nbsp;<span className={styles.span2}>{section.taskNums}</span></h5>
      <div>
        <ul style={{marginTop: 10}}>
          {tasks.filter((el: any) => el.section===section.name).sort((a: any, b: any) => a -  b).map((el: any, index: any) =>
            <li>
              <List el={el} id={el.id} done={el.done} data={el.data} key={index}/>
            </li>
          )}
        </ul>
      </div>
    </div>
  )

}
const mapStateToProps = (state: any) => ({
  tasks: state.Data.tasks,
  sections: state.Data.section
})

// const mapDispatchToProps = (state) => {
//
// }

export default connect(mapStateToProps) (Deals);
