// ==UserScript==
// @name         Itens Navegados
// @namespace    https://github.com/raphaelcaires
// @version      0.1
// @description  Script para gerar um perfil com os itens navegados
// @author       Raphael Caires
// @match        https://www.kabum.com.br/produto/*
// @match        https://www.kabum.com.br/precarrinho/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

setTimeout(() => {(function () {

    var interest = [];
    var basket = [];
    var users = [];

    if (users.filter(e => e.userId === userId).length <= 0) {
      users = JSON.parse(window.sessionStorage.getItem('userData') || '[]');
    }

  if (window.location.href.indexOf('https://www.kabum.com.br/produto/') > -1) {
    const interestItem = {};
    const name = document.querySelector("h1[itemprop='name']").innerText;
    const productClass = document.querySelector("meta[name='pushnews-category']").content;
    const skuId = window.location.pathname.split('/')[2];
    const price = document.querySelector("h4[itemprop='price']").innerText;

    interest = JSON.parse(window.sessionStorage.getItem('interestItem') || '[]');
    basket = JSON.parse(window.sessionStorage.getItem('basketItem') || '[]');

    interestItem.name = name;
    interestItem.productClass = productClass;
    interestItem.skuId = skuId;
    interestItem.price = price;

    if (interest.filter(e => e.skuId === window.location.pathname.split('/')[2]).length <= 0) {
      interest.push(interestItem);
    }

    window.sessionStorage.setItem('interestItem', JSON.stringify(interest));
  }

  if (window.location.href.indexOf('https://www.kabum.com.br/precarrinho/') > -1) {

    const basketItem = {};
    interest = JSON.parse(window.sessionStorage.getItem('interestItem') || '[]');
    basket = JSON.parse(window.sessionStorage.getItem('basketItem') || '[]');
    const lastItemSkuId = interest[interest.length - 1].skuId;

    if (basket.filter( e => e.skuId === window.location.pathname.split('/')[2]).length <= 0) {
      if (window.location.pathname.split('/')[2] == lastItemSkuId) {
        basket.push(interest[interest.length - 1]);
      }
    }

    window.sessionStorage.setItem('basketItem', JSON.stringify(basket));
  }

  function generateUserId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
  }

  const userId = generateUserId();
  const userData = {};

  userData.userId = userId;
  userData.interest = interest;
  userData.basket = basket;
  users.push(userData);

  window.localStorage.setItem('userData', JSON.stringify(users));

  console.log(interest);
  console.log(basket);
  console.log(users);

})();}, 5000);
