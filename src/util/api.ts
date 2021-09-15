import axios from "axios";
import { CardFieldType } from "../interfaces/CardFieldType";
const AUTH_URL = "https://baokudata.qingtime.cn/sgbh";
const API_URL = "https://timeosdata.qingtime.cn";
let token: string | null = localStorage.getItem("auth_token");

const request = {
  get(path: string, params?: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "get",
          url: path,
          params: params,
          headers: {
            token: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  post(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "post",
          url: path,
          data: params,
          headers: {
            token: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  patch(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "patch",
          url: path,
          data: params,
          headers: {
            token: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
  delete(path: string, params: object) {
    return new Promise(async function (resolve, reject) {
      try {
        const response = await axios({
          method: "delete",
          url: path,
          data: params,
          headers: {
            token: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  },
};

const auth = {
  loginByToken(token: string) {
    return request.get(AUTH_URL + "/account/userinfo", { token: token });
  },
  syncUser(
    userKey: string,
    userName: string,
    mobile: string,
    app: number,
    appHigh: number,
    userAvatar?: string,
    email?: string
  ) {
    return request.patch(API_URL + "/user", {
      userKey: userKey,
      userName: userName,
      userAvatar: userAvatar,
      email: email,
      mobile: mobile,
      app,
      appHigh,
    });
  },
  // 获取七牛云uptoken
  getUptoken() {
    return request.get(AUTH_URL + "/upTokenQiniu/getQiNiuUpToken", {
      token: token,
      type: 2,
    });
  },
  getUptokenOverWrite(key: string) {
    return request.get(AUTH_URL + "/upTokenQiniu/getQiNiuUpTokenKey", {
      token: token,
      type: 2,
      key,
    });
  },
  searchUser(keyWord: string) {
    return request.get(API_URL + "/user/search", { keyWord });
  },
  // TODO 分页
  searchUserLocal(keyWord: string) {
    return request.get(API_URL + "/user/searchFriend", {
      keyWord,
      page: 1,
      limit: 1000,
    });
  },
  addFriend(friendKey: string) {
    return request.post(API_URL + "/user/friend", { friendKey });
  },
  getFriendList() {
    return request.get(API_URL + "/user/friend", { page: 1, limit: 2000 });
  },
  getRecentCollab() {
    return request.get(API_URL + "/user/partner");
  },
  switchToken(appHigh: number, app?: number) {
    return request.get(AUTH_URL + "/account/switchToken", {
      token: token,
      appHigh: appHigh,
      app: app,
    });
  },
  getWallPapers() {
    return request.get(API_URL + "/wallPaper");
  },
  getIcons(page: number, limit: number, tagKey?: string) {
    return request.get("https://icondata.qingtime.cn/icon", {
      page,
      limit,
      tagKey,
    });
  },
  getUnsplashImages() {
    return request.get("https://api.unsplash.com/photos/random", {
      client_id: "PWr2enHljv71dG8XrmNwVorgtYkPfe89j5OXywvx7sc",
      count: 30,
    });
  },
  searchUnsplashImages(query: string, page: number, per_page: number) {
    return request.get("https://api.unsplash.com/search/photos", {
      client_id: "PWr2enHljv71dG8XrmNwVorgtYkPfe89j5OXywvx7sc",
      query,
      page,
      per_page,
    });
  },
  getPrivateChatId(friendKey: string) {
    return request.get(API_URL + "/user/friend/privateChatId", {
      friendKey,
    });
  },
};

const options = {
  init() {
    return request.get(API_URL + "/user");
  },
  getWallPapers(page: number, limit: number) {
    return request.get(API_URL + "/wallPaper", {
      page,
      limit,
    });
  },
  setWallpaper(wallKey: string) {
    return request.patch(API_URL + "/user/subscribe", {
      wallKey: wallKey,
    });
  },
  getApps(keyword?: string, tagKey?: string, added?: boolean) {
    return request.get(API_URL + "/appType", {
      name: keyword,
      tagKey,
      added,
    });
  },
  addApp(appKey: string) {
    return request.post(API_URL + "/user/app", {
      appKey: appKey,
    });
  },
  deleteApp(appKey: string) {
    return request.delete(API_URL + "/user/app", {
      appKey: appKey,
    });
  },
  getCategories() {
    return request.get(API_URL + "/tag");
  },
  fixApp(nodeKey: string) {
    return request.patch(API_URL + "/appType/top", {
      nodeKey,
    });
  },
};

const node = {
  addTreeNode(
    nodeKey: string,
    addType: "peer" | "child",
    type: string,
    appKey: string,
    rootKey?: string,
    docType?: "e-book" | "task-tree",
    name?: string
  ) {
    return request.post(API_URL + "/node/onTree", {
      nodeKey,
      addType,
      type,
      appKey,
      rootKey,
      name,
      docType,
    });
  },
  createNode(
    name: string,
    type: string,
    detail: any,
    appKey?: string,
    fatherId?: string,
    url?: string,
    fileSize?: number,
    thumbnail?: string,
    docType?: "e-book" | "task-tree" | "knowledgebase",
    styleType?: any,
    fileType?: string,
    customTime?: number
  ) {
    return request.post(API_URL + "/node", {
      name: name,
      type: type,
      fatherId: fatherId,
      appKey: appKey,
      url: url,
      detail: detail,
      fileSize: appKey ? 0 : url ? fileSize : undefined,
      thumbnail,
      docType,
      styleType,
      fileType,
      createTime: new Date().getTime(),
      customTime,
    });
  },
  /**
   * 更新节点
   * @param nodeKey
   * @param name
   * @param type
   * @param status 0：删除 1:正常
   */
  updateNode(
    nodeKey: string,
    name?: string,
    type?: string,
    detail?: any,
    status?: number,
    thumbnail?: string,
    url?: string,
    sortList?: string[],
    icon?: string,
    styleType?: any,
    openNewTab?: boolean,
    rootKey?: string,
    star?: number,
    customTime?: number
  ) {
    return request.patch(API_URL + "/node", {
      nodeKey,
      name: name !== undefined ? (name ? name : "新标题") : undefined,
      type,
      status,
      detail,
      thumbnail,
      url,
      sortList,
      icon,
      styleType,
      openNewTab,
      rootKey,
      star,
      customTime,
    });
  },
  /**
   * 修改节点任务(树上)
   * @param nodeKey
   * @param executor
   * @param hour
   * @param limitDay 截止时间
   * @param check
   * @param needObject
   */
  updateTask(
    nodeKeyArr: string[],
    executor?: string,
    hour?: number,
    limitDay?: number,
    check?: boolean,
    filed?: boolean,
    star?: number
  ) {
    return request.patch(API_URL + "/node/task/batch", {
      nodeKeyArr,
      executor,
      hour,
      limitDay,
      checked: check,
      filed,
      star,
    });
  },
  /**
   * 修改节点任务
   * @param nodeKey
   * @param executor
   * @param hour
   * @param limitDay 截止时间
   * @param check
   * @param name
   */
  updateProjectTask(
    nodeKey: string,
    executor?: string,
    hour?: number,
    limitDay?: number,
    check?: boolean,
    name?: string,
    filed?: boolean
  ) {
    return request.patch(API_URL + "/node/task/inProject", {
      nodeKey,
      executor,
      hour,
      limitDay,
      checked: check,
      name,
      filed,
    });
  },
  /**
   * 退出分享
   * @param nodeKey
   */
  exitShare(nodeKey: string) {
    return request.delete(API_URL + "/node/share/active", {
      nodeKey: nodeKey,
    });
  },
  getNodes(nodeKey: string) {
    return request.get(API_URL + "/node/list", {
      nodeKey: nodeKey,
    });
  },
  revertNodeIcon(nodeKey: string, isTaskTree?: boolean) {
    return request.patch(API_URL + "/node/icon/default", {
      nodeKey: nodeKey,
      isTaskTree,
    });
  },
  getNodePath(nodeKey: string) {
    return request.get(API_URL + "/node/way", {
      nodeKey: nodeKey,
    });
  },
  getNodeDeail(nodeKey: string, bookId?: string) {
    return request.get(API_URL + "/node/detail", {
      nodeKey: nodeKey,
      bookId,
    });
  },
  getNodeByKey(nodeKey: string) {
    return request.get(API_URL + "/node/info", {
      nodeKey: nodeKey,
    });
  },
  getNodeDeailNoToken(nodeKey: string) {
    return request.get(API_URL + "/node/detailNoToken", {
      nodeKey: nodeKey,
    });
  },
  /**
   * 回收箱
   */
  getRecycle(currentPage: number, perPage: number) {
    return request.get(API_URL + "/node/recycle", {
      page: currentPage,
      limit: perPage,
    });
  },
  completelyDelete(nodeKeyArr?: string[]) {
    return request.delete(API_URL + "/node/recycle", {
      nodeKeyArr: nodeKeyArr,
    });
  },
  /**
   * 搜索节点
   * @param keyWord 关键字
   * @param nodeKey 父亲节点，有则搜索该节点下的节点，无则搜索该用户的所有节点
   * @param appKey 有则搜索该文档类型的节点，没有则搜索所有节点
   * @param isFile 有则搜索文档节点
   */
  search(
    keyWord: string,
    nodeKey?: string,
    appKey?: string,
    isFile?: boolean,
    type?: string
  ) {
    return request.get(API_URL + "/node/search", {
      nodeKey,
      keyWord,
      appKey,
      isFile,
      type,
    });
  },
  copy(nodeKey: string, fatherId: string, rootKey?: string) {
    return request.post(API_URL + "/node/copyOnTree", {
      nodeKey,
      fatherId,
      rootKey,
    });
  },
  cut(nodeKeyArr: string[], fatherId: string, oldFather: string) {
    return request.post(API_URL + "/node/cut", {
      nodeKeyArr: nodeKeyArr,
      fatherId: fatherId,
      oldFather,
    });
  },
  drag(
    nodeKey: string,
    targetNodeKey: string,
    placement: "up" | "down" | "in",
    oldFather: string
  ) {
    return request.patch(API_URL + "/node/drag", {
      nodeKey,
      targetNodeKey,
      placement,
      oldFather,
    });
  },
  /**
   * 批量删除
   * @param nodeKeyArr
   * @returns
   */
  deleteBatch(nodeKeyArr: string[]) {
    return request.delete(API_URL + "/node/batch", {
      nodeKeyArr,
    });
  },
  // 展开/收起
  expand(nodeKey: string, fatherId: string, rootKey?: string) {
    return request.patch(API_URL + "/node/contract", {
      nodeKey,
      fatherId,
      rootKey,
    });
  },
  // 打包/取消打包
  archive(nodeKey: string, isTaskTree?: boolean) {
    return request.patch(API_URL + "/node/pack", {
      nodeKey,
      isTaskTree,
    });
  },
  // 收藏/取消收藏
  fav(nodeKey: string) {
    return request.post(API_URL + "/node/collect", {
      nodeKey,
    });
  },
  importNode(
    nodeKey: string,
    text: string,
    fatherId: string,
    rootKey?: string
  ) {
    return request.post(API_URL + "/node/batch", {
      nodeKey,
      nodeText: text,
      fatherId,
      rootKey,
    });
  },
  /**
   * 获取最新上传的文件
   * @param currentPage
   * @param perPage
   * @param appKey
   * @returns
   */
  getRecentUpload(currentPage: number, perPage: number, projectKey?: string) {
    return request.get(API_URL + "/user/uploadFile", {
      page: currentPage,
      limit: perPage,
      projectKey,
    });
  },
  viewUploadFileLog(nodeKey: string) {
    return request.post(API_URL + "/node/uploadFile/log", {
      nodeKey,
    });
  },
  getNodeFromWeb(page: number, limit: number, type?: string) {
    return request.get(API_URL + "/node/fromWeb", {
      page,
      limit,
      type,
    });
  },
  // 獲取文檔列表
  getDocList(
    currentPage: number,
    perPage: number,
    appKey?: string,
    projectKey?: string,
    type?: string,
    star?: number
  ) {
    return request.get(API_URL + "/node/file", {
      appKey: appKey,
      page: currentPage,
      limit: perPage,
      projectKey,
      type,
      star,
    });
  },
  /**
   * 我的收藏
   * @param page 頁碼
   * @param limit 每頁條數
   * @param days 最近幾天的，沒有則是全部
   * @param showOriginal 是否顯示快捷方式的原始節點
   */
  getFavList(
    page: number,
    limit: number,
    days?: number,
    showOriginal?: boolean,
    appKey?: string,
    projectKey?: string,
    type?: string,
    star?: number
  ) {
    return request.get(API_URL + "/user/fav", {
      page,
      limit,
      days,
      showOriginal,
      appKey,
      projectKey,
      type,
      star,
    });
  },
  /**
   * 分享給我的
   * @param page 頁碼
   * @param limit 每頁條數
   * @param days 最近幾天的，沒有則是全部
   */
  getShareList(
    page: number,
    limit: number,
    days?: number,
    appKey?: string,
    projectKey?: string,
    type?: string
  ) {
    return request.get(API_URL + "/user/shareToMe", {
      page,
      limit,
      days,
      appKey,
      projectKey,
      type,
    });
  },
  /**
   * 分享出去的
   * @param page 頁碼
   * @param limit 每頁條數
   * @param days 最近幾天的，沒有則是全部
   */
  getShareOutList(
    page: number,
    limit: number,
    days?: number,
    appKey?: string,
    projectKey?: string,
    type?: string
  ) {
    return request.get(API_URL + "/user/share", {
      page,
      limit,
      days,
      appKey,
      projectKey,
      type,
    });
  },
  /**
   * 公開分享
   * @param nodeKey
   */
  publicShare(nodeKey: string) {
    return request.patch(API_URL + "/node/public", {
      nodeKey,
    });
  },
  /**
   * 判斷是否是公開分享
   * @param nodeKey
   */
  isPublicShare(nodeKey: string) {
    return request.get(API_URL + "/node/public", {
      nodeKey,
    });
  },
  /**
   * 獲取消息列表
   * @param page 頁碼
   * @param limit 每頁條數
   * @param unRead 是否显示未读总数
   * @param status 1:未读；2:已读
   */
  getNotificationList(
    page: number,
    limit: number,
    unRead?: boolean,
    status?: number
  ) {
    return request.get(API_URL + "/user/message", {
      page,
      limit,
      unRead,
      status,
    });
  },
  /**
   * 消息已读
   * @param messageKey
   */
  readNotification(messageKey: string) {
    return request.patch(API_URL + "/message", {
      messageKey,
    });
  },
  clearReadMessage() {
    return request.delete(API_URL + "/message/read", {});
  },
  initApp(suffix?: string, noToken?: boolean) {
    return request.get(API_URL + "/appType/bySuffix", {
      suffix,
      noToken,
    });
  },
  /**
   * 獲取知識樹
   */
  getRepositoryTree(
    nodeKey?: string,
    showEditor?: boolean,
    fatherKey?: string,
    rootKey?: string,
    showDetail?: boolean
  ) {
    return request.get(API_URL + "/node/tree", {
      nodeKey,
      showEditor,
      fatherKey,
      rootKey,
      showDetail,
    });
  },
  getFolderTree(
    nodeKey?: string,
    returnAll?: number,
    returnTaskTree?: number,
    showFolderIcon?: boolean
  ) {
    return request.get(API_URL + "/node/tree/simple", {
      nodeKey,
      returnAll,
      returnTaskTree,
      showFolderIcon,
    });
  },
  getChildNodes(
    nodeKey: string,
    page: number,
    limit: number,
    returnFolder?: boolean
  ) {
    return request.get(API_URL + "/node/child/files", {
      nodeKey,
      page,
      limit,
      returnFolder,
    });
  },
  // 轉換節點
  convertNode(
    nodeKey: string,
    type: string,
    appKey?: string,
    rootKey?: string
  ) {
    return request.patch(API_URL + "/node/type", {
      nodeKey,
      type,
      appKey,
      rootKey,
    });
  },
  /**
   * 獲取節點日誌
   * @param page 頁碼
   * @param limit 每頁條數
   */
  getNodeLog(nodeKey: string, page: number, limit: number) {
    return request.get(API_URL + "/node/log", {
      nodeKey,
      page,
      limit,
    });
  },
  /**
   * 獲取用戶項目列表
   */
  getProjectList(filter?: "create" | "share") {
    return request.get(API_URL + "/user/project", { filter });
  },
  /**
   * 展開當前節點前的所有節點
   * @param nodeKey
   */
  checkContract(nodeKey: string) {
    return request.post(API_URL + "/node/checkContract", {
      nodeKey,
    });
  },
  exportTree(nodeKey?: string) {
    return request.get(API_URL + "/node/export", { nodeKey });
  },
  getProjectTaskTree() {
    return request.get(API_URL + "/user/projectTaskTree");
  },
  getTaskFilterConfig() {
    return request.get(API_URL + "/user/fiterConfig");
  },
  getTaskDateList(userKey: string) {
    return request.get(API_URL + "/task/friend/summary", {
      friendKey: userKey,
    });
  },
  getUserTasksByDay(userKey: string, date: string) {
    return request.get(API_URL + "/task/friend/byDay", {
      friendKey: userKey,
      dateString: date,
    });
  },
  moveTaskTree(nodeKey: string, targetNodeKey: string, oldFather: string) {
    return request.patch(API_URL + "/node/moveTaskTree", {
      nodeKey,
      targetNodeKey,
      oldFather,
    });
  },
  // 獲取文檔列表
  getNodesInTime(
    startTime: number,
    endTime: number,
    star?: number,
    nodeKey?: string,
    appKey?: string,
    type?: string
  ) {
    return request.get(API_URL + "/node/timeline", {
      begTime: startTime,
      endTime,
      star,
      nodeKey,
      appKey,
      type,
    });
  },
  getQuickAccess(page: number, limit: number) {
    return request.get(API_URL + "/quickAccess/list", {
      page,
      limit,
    });
  },
  addQuickAccess(nodeKey: string) {
    return request.post(API_URL + "/quickAccess", {
      nodeKey,
    });
  },
  removeQuickAccess(nodeKey: string) {
    return request.delete(API_URL + "/quickAccess", {
      nodeKey,
    });
  },
};

const share = {
  /**
   * 节点协作者列表
   * @param nodeKey
   */
  getShares(nodeKey: string) {
    return request.get(API_URL + "/node/share/people", { nodeKey });
  },
  share(
    nodeKey: string,
    toUser: string,
    role: "admin" | "edit" | "author" | "read"
  ) {
    return request.post(API_URL + "/node/share", {
      nodeKey,
      toUser,
      role,
    });
  },
  editShare(
    nodeKey: string,
    toUser: string,
    role: "admin" | "edit" | "author" | "read"
  ) {
    return request.patch(API_URL + "/node/share", {
      nodeKey,
      toUser,
      role,
    });
  },
  cancelShare(nodeKey: string, toUser: string) {
    return request.delete(API_URL + "/node/share/passive", {
      nodeKey,
      toUser,
    });
  },
  exitShare(nodeKey: string) {
    return request.delete(API_URL + "/node/share/active", {
      nodeKey,
    });
  },
};

const comment = {
  postComment(nodeKey: string, commentDetail: string, commentId?: string) {
    return request.post(API_URL + "/comment", {
      nodeKey,
      commentDetail,
      commentId,
    });
  },
  getComments(nodeKey: string, page: number, limit: number) {
    return request.get(API_URL + "/comment", {
      nodeKey,
      page,
      limit,
    });
  },
  deleteComment(commentId: string) {
    return request.delete(API_URL + "/comment", {
      commentId,
    });
  },
};

const card = {
  addCard(name: string, icon: string, cardFieldArr: CardFieldType[]) {
    return request.post(API_URL + "/card", {
      name,
      icon,
      cardFieldArr,
    });
  },
  editCard(cardKey: string, name: string, icon: string) {
    return request.patch(API_URL + "/card", {
      cardKey,
      name,
      icon,
    });
  },
  getCards() {
    return request.get(API_URL + "/card");
  },
  deleteCard(cardKey: string) {
    return request.delete(API_URL + "/card", {
      cardKey,
    });
  },
  getCardDetail(cardKey: string) {
    return request.get(API_URL + "/card/detail", { cardKey });
  },
  addCardField(field: CardFieldType) {
    return request.post(API_URL + "/card/field", { ...field });
  },
  editCardField(field: CardFieldType) {
    return request.patch(API_URL + "/card/field", { ...field });
  },
};

export default {
  auth,
  options,
  node,
  share,
  comment,
  card,
  setToken: (_token: string) => {
    localStorage.setItem("auth_token", _token);
    token = _token;
  },
};
