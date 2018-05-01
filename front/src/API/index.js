import request from 'superagent';
import { formatUrl } from '../Utils';

export default class API {
  static getAllPlaysIds() {
    return request.get(formatUrl('/'))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static getPlay(id) {
    return request.get(formatUrl(id))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static getActs(playId) {
    return request.get(formatUrl(`${playId}/acts`))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static getScenes(playId, actIndex) {
    return request.get(formatUrl(`${playId}/${actIndex}/scenes`))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static getActions(playId, actIndex, sceneIndex) {
    return request.get(formatUrl(`${playId}/${actIndex}/${sceneIndex}/actions`))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static getSingleAction(playId, actIndex, sceneIndex, actionIndex) {
    return request.get(formatUrl(`${playId}/${actIndex}/${sceneIndex}/${actionIndex}`))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static editSay(playId, actIndex, sceneIndex, actionIndex, sayIndex, newValue) {
    return request.put(formatUrl(`${playId}/${actIndex}/${sceneIndex}/${actionIndex}/${sayIndex}`))
      .send(newValue)
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static addSay(playId, actIndex, sceneIndex, actionIndex, value) {
    return request.post(formatUrl(`${playId}/${actIndex}/${sceneIndex}/${actionIndex}`))
      .send(value)
      .then(response => response.body)
      .catch(error => console.trace(error));
  }

  static delSay(playId, actIndex, sceneIndex, actionIndex, sayIndex) {
    return request.del(formatUrl(`${playId}/${actIndex}/${sceneIndex}/${actionIndex}/${sayIndex}`))
      .then(response => response.body)
      .catch(error => console.trace(error));
  }
}
