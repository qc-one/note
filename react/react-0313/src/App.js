// 项目的根组件：APP -> index.js -> public/index.html(root)
import { useState, useRef, createContext, useContext, useEffect } from "react";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { inscrement, decrement } from "./store/modules/counterStore";
// import { fetchChannels } from "./store/modules/channelStore";

import { Link, RouterProvider } from "react-router-dom";
import router from "./router";
import "./App.scss";

function useToggle() {
    let [showDiv, setShowDiv] = useState(true);
    const toggle = () => {
        setShowDiv(!showDiv);
    };
    return {
        showDiv,
        toggle,
    };
}

let MsgContext = createContext();

function A() {
    let a = useContext(MsgContext);
    return <div>this is A:{a}</div>;
}

function Son(props) {
    console.log(props, "props");
    return (
        <div>
            this is son:{props.name}
            {props.children}
            <button
                onClick={() => {
                    props.onHandle(123);
                }}
            >
                我是子组件{" "}
            </button>
            <A></A>
        </div>
    );
}

function App() {
    let list = [
        { id: 1001, name: "vue" },
        { id: 1002, name: "react" },
        { id: 1003, name: "vue33" },
    ];
    let flag = false;
    let articleType = 3; // 0 1 3
    function getArticle() {
        if (articleType === 0) {
            return <span>0</span>;
        } else if (articleType === 1) {
            return <span>1</span>;
        } else if (articleType === 3) {
            return <span>3</span>;
        }
    }
    function clickHandler(e) {
        console.log("事件绑定", e);
        console.log(inputRef.current, "ref");
    }
    let [count, setCount] = useState(0);
    let [person, setPerson] = useState({
        name: "qin",
        age: 18,
    });
    function setCountHandler() {
        setCount(count + 1);
        setPerson({
            ...person,
            name: "chuang",
        });
    }
    // 受控绑定表单
    // 1.通过value属性绑定react状态
    // 2.绑定onChange事件，通过事件参数e拿到输入框最新的值，反向修改react状态
    const [value, setValue] = useState("123");
    const inputRef = useRef(null);
    // 清空并聚焦
    function clearValue() {
        setValue("");
        inputRef.current.focus();
    }
    let [name, setName] = useState("this is app name");
    // function onParentsHandle(s) {
    //     console.log(s, "我是父组件");
    // }
    let [msg] = useState("11");
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("useEffect");
        // setTimeout(() => {
        //     setMsg(msg);
        // }, 3000);
        // dispatch(fetchChannels());
    });

    const { showDiv, toggle } = useToggle();

    const { countS } = useSelector((state) => {
        return state.counter;
    });

    const { channel } = useSelector((state) => {
        return state.channel;
    });
    return (
        <div className="App">
            this is app
            <RouterProvider router={router}></RouterProvider>
            {/* <Link to="/article">跳转到文章页</Link> */}
            {/* <ul>
                {channel.map((item) => (
                    <li>{item}</li>
                ))}
            </ul>
            <button
                onClick={() => {
                    dispatch(
                        decrement({
                            num: 10,
                        })
                    );
                }}
            >
                -10
            </button>
            countS:{countS}
            <button
                onClick={() => {
                    dispatch(inscrement({ num: 10 }));
                }}
            >
                +10
            </button>
            {showDiv && <div>this is div</div>}
            <button
                onClick={() => {
                    toggle();
                }}
            >
                showDiv
            </button>
            <MsgContext.Provider value={msg}>
                <Son name={name} onHandle={setName}>
                    <div>345</div>
                </Son>
            </MsgContext.Provider>
            {list.map((item) => {
                return <li key={item.id}>{item.name}</li>;
            })}
            {flag && "true"}
            {flag ? "true" : "false222"}
            文章类型：{getArticle()}
            <button onClick={clickHandler}>事件绑定</button>
            <button onClick={() => clickHandler("click")}>事件绑定222</button>
            <div>
                {person.name}
                {person.age}
                <button
                    onClick={setCountHandler}
                    // className={`default ${count === 2 && "active"}`}
                    className={classnames("default", { active: count === 2 })}
                >
                    {count}
                </button>
            </div>
            <input
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                type="text"
                ref={inputRef}
            />
            <div>{value}</div>
            <button
                onClick={() => {
                    clearValue();
                }}
            >
                清空并聚焦
            </button> */}
        </div>
    );
}

export default App;
