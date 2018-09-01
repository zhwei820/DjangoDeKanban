// import KanbanClient from '@/utils/kanbanClient';
import camelcaseKeys from 'camelcase-keys';


const state = {
  boardData: {
    pipeLineList: [],
  },
};


const getters = {
  getSocket(state, getters, rootState) {
    return rootState.socket;
  },
  getFilteredPipeLineList(state) {
    return state.boardData.pipeLineList;
  },
};

const actions = {
  initBoard({ getters }, boardId) {
    const socket = getters.getSocket;
    socket.sendObj({
      type: 'init_board',
      boardId,
    });
  },
  updateCardOrder({ commit, getters }, { pipeLineId, cardList }) {
    console.log(pipeLineId, cardList);
    const socket = getters.getSocket;
    socket.sendObj({
      type: 'update_card_order',
      pipeLineId,
      cardIdList: cardList.map(x => x.cardId),
    });
    commit('updateCardOrder', { pipeLineId, cardList });
  },
};

const mutations = {
  setBoardData(state, { boardData }) {
    state.boardData = camelcaseKeys(boardData, { deep: true });
  },
  updateCardOrder(state, { pipeLineId, cardList }) {
    const targetPipeLine = state.boardData.pipeLineList.find(pipeLine => pipeLine.pipeLineId === pipeLineId);
    targetPipeLine.cardList = cardList;
  },
};


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};