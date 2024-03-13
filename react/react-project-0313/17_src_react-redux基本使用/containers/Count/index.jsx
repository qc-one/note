// 引入Count的UI组件
import CountUI from '../../components/Count';
// 引入redux
import store from '../../redux/store'; 
// 引入connect用于连接UI组件与redux
import {connect} from 'react-redux'
// 引入action
import { createIncrementAction, createDecrementAction} from '../../redux/count_action_creators'
import { number } from 'prop-types';

// 创建Count的容器组件
// connect接收两个参数，必须是函数，第一个参数为redux中所保存的状态，第二个参数为操作状态的方法
// mapStateToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---状态
function mapStateToProps(state) {
    return {
        count: state
    }
}
// mapDispatchToProps函数的返回值作为状态传递给了UI组件，返回值必须为一个对象，对象的key作为传递给UI组件props的key，value就作为传递给UI组件props的value---操作状态的方法
function mapDispatchToProps(dispatch) {
    return {
        add: (number) => {
            // dispatch({type: 'increment', data: number})
            dispatch(createIncrementAction(number))
        },
        jian: number => dispatch(createDecrementAction(number))
    }
}
const CountContainer = connect(mapStateToProps, mapDispatchToProps)(CountUI);

export default CountContainer


