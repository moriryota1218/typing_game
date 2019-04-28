'use strict';

{
  // 複数の単語を定数で用意
  const words = [
    'apple',
    'orange',
    'banana',
    'cat',
    'star',
    'eagle',
  ]
  //各変数を宣言
  let word;
  let loc;
  let score;
  let miss;
  // 時間制限を設ける
  const timeLimit = 10 * 1000;
  let startTime;
  // ゲームが始まっているか変数で管理
  let isPlaying = false;

  // html要素を取得
  const target = document.getElementById('target');
  const scoreLabel = document.getElementById('score');
  const missLabel = document.getElementById('miss');
  const timerLabel = document.getElementById('timer');

  // updateTarget関数を取得
  function updateTarget() {
    let placeholder = ''; //初期化
    for(let i = 0; i < loc; i++){
      placeholder += '_';
    }
    // substring()で部分文字列を取得
    target.textContent = placeholder + word.substring(loc);
  }
  // 正答率を表示する
  function showResult() {
    const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
    // テンプレートリテラルを使い表示
    alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);


  }

  // 残り時間の計算
  function updateTimer() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);

    // カウントダウンの処理
    const timeoutId = setTimeout(() => {
      updateTimer();
    }, 10);

    if(timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      // タイマーの調整
      setTimeout(() => {
        showResult();
      }, 100);

      // ゲームオーバーになった時のリプレイの処理
      timerLabel.textContent = '0.00';
      target.textContent = 'click to replay';

    }
  }
  // クリックするとゲームスタート
  window.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    // 値の初期化
    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;

    // ワードをランダムに表示する
    word = words[Math.floor(Math.random() * words.length)];



    updateTarget();
    // 時間経過を指定
    startTime = Date.now();
    updateTimer();
  });

  window.addEventListener('keyup', e => {
    // タイピングミスの調整
    if (isPlaying !== true) {
      return;
    }
    // 変数loc番目の文字が、タイプされたキーと同じか判定する
    if (e.key === word[loc]) {
      // console.log('score');
      // 次の文字進める処理（次の文字が打てる）
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      // scoreを増やす
      score++;
      scoreLabel.textContent = score;
      updateTarget();
    } else {
      // console.log('miss');
      miss++;
      missLabel.textContent = miss;
    }
  });
}
