// 项目的根组件：APP -> index.js -> public/index.html(root)
import { useState, useRef } from "react";
import classnames from "classnames";

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
    return (
        <div className="App">
            this is app
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
        </div>
    );
}

export default App;
