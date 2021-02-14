import styles from './index.less';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'umi';

function IndexPage(props) {
  const {count} = props;

  return (
    <div>
      <h1 className={styles.title}>My tasks {count}</h1>
      <button onClick = {props.plusOne}>Plus</button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  // count: state.Count.count,
});

const mapDispatchToProps = (dispatch: any) => ({
  plusOne: () => dispatch({ type: 'Count/plus' }),
});

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);
