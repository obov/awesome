import { useReducer } from "react";
let initValue = [
  { id:0, name:'hi' },
  { id:1, name:'hello'}
]
function reducer(state, action) {
  const nextID = state.length
  switch (action.type) {
    case 'INSERT':
      return state.concat({id:nextID,name:'xxx'+nextID});
    case 'DELETE':
      return state.filter((e)=> e.id!==(nextID-1))
    default:
      return state;
  }
}

function Counter() {
  const [members, dispatch] = useReducer(reducer, initValue);

  const onIncrease = () => {
    dispatch({ type: 'INSERT' });
  };

  const onDecrease = () => {
    dispatch({ type: 'DELETE' });
  };

  return (
    <div>
      {members.map((e)=>(<li key={e.id}>{e.name}</li>))}
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </div>
  );
}

export default Counter;