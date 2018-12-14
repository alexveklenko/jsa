import { data } from "./data";
import { createStore } from "redux";
import { generate as id } from "shortid";

const ACTION_SELECT = "ACTION_SELECT";
const ACTION_ADD = "ACTION_ADD";

const select = document.getElementById("status-select");
const results = document.getElementById("results");
const statuses = data.statuses;
const initialState = { selected: -1, ...data };

const selectData = statuses.reduce((acc, currVal) => {
  return acc + `<option value="${currVal.id}">${currVal.title}</option>`;
}, ``);

select.insertAdjacentHTML("beforeend", selectData);

function updateList(state = initialState, action) {
  if (action.type === ACTION_SELECT) {
    state.selected = action.value;
    return state;
  } else if (action.type === ACTION_ADD) {
    if (action.value) {
      state.players.push({
        id: id(),
        name: action.value,
        result: 0,
        status: 3
      });
    }
    return state;
  }
}

function render(state) {
  const players = state.players;
  const selected = state.selected;
  const output = players.reduce((acc, cur, idx) => {
    let rowClass = "";
    if (cur.status == selected) {
      rowClass = 'class="table-info"';
    }
    return (
      acc +
      `
      <tr ${rowClass}>
        <td>${idx + 1}</td>
        <td>${cur.name}</td>
        <td>${cur.result}</td>
        <td>${cur.status}</td>
      </tr>
      `
    );
  }, ``);

  results.innerHTML = output;
}

render(initialState);

let store = createStore(updateList);

select.addEventListener("change", ({ target }) => {
  store.dispatch({ type: ACTION_SELECT, value: target.value });
  render(store.getState());
});

const addUserForm = document.forms["addPlayer"];
const userInputEl = addUserForm.querySelector("input");

addUserForm.addEventListener("submit", e => {
  e.preventDefault();
  store.dispatch({ type: ACTION_ADD, value: userInputEl.value });
  render(store.getState());
  userInputEl.value = "";
});
