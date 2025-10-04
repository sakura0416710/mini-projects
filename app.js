document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-button");
  const screenMain = document.getElementById("screen-main");
  const screenList = document.getElementById("screen-list");
  const screenResult = document.getElementById("screen-result");
  const menuBtn = document.querySelector(".menu");

  const items = document.querySelectorAll(".roulette-list-container h3");
  const resultTitle = document.getElementById("result-title");
  const resultImage = document.getElementById("result-image");

  let rouletteInterval;

  // 1. Start 버튼 클릭
  startBtn.addEventListener("click", () => {
    screenMain.style.display = "none";   // 메인 숨기기
    screenList.style.display = "block";  // 리스트 보여주기

    startRoulette();
  });

  // 2. 룰렛 시작 (setTimeout 재귀 구조)
  function startRoulette() {
    const maxRounds = 25; 
    let currentIndex = 0;
    let round = 0;
    let speed = 100;

    function step() {
      // 모든 아이템 초기화
      items.forEach(item => {
        item.style.backgroundColor = "";
        item.style.color = "";
      });

      // 현재 인덱스 하이라이트
      items[currentIndex].style.backgroundColor = "#e9caf1e0";

      currentIndex = (currentIndex + 1) % items.length;
      round++;

    if (round > maxRounds) {
            // 멈출 위치 결정
            const stopIndex = Math.floor(Math.random() * items.length);
            const stopItem = items[stopIndex];
            
            if(stopItem) {
            stopItem.style.backgroundColor = "#e9caf1e0";
            stopItem.style.color = "#fff";
            showResult(stopItem);
          }
          return;
          }

          // 속도 점점 느려지게
          if (round > maxRounds * 0.6) speed += 30;

          setTimeout(step, speed);
        }

        step(); // 시작
      }

 


  // 3. 결과 화면 표시
  function showResult(finalItem) {
    screenList.style.display = "none";
    screenResult.style.display = "block";

    resultTitle.textContent = finalItem.textContent.trim();

    const imgPath = finalItem.dataset.img || "https://sakura0416710.github.io/mini-projects/image/default.png";
    resultImage.src = `${imgPath}?v=${Date.now()}`; // 캐시 방지
  }


//3-1. 버튼 클릭 시 메인 화면으로
  const allButtons = document.querySelectorAll(".pause-button, .play-button, .next1, .next2, .previous, .play-arrow-filled-2");

  allButtons.forEach(btn => {
    btn.addEventListener("click", resetToMain);
  });

  menuBtn.addEventListener("click", resetToMain);


  const stickerImages = document.querySelectorAll(".image, .image-2, .element, .image-3, .image-4, .image-5, .image-6, .image-7, .image-8, .image-9");
  stickerImages.forEach(img => {
    img.addEventListener("click", resetToMain);
  });

// 메인 화면으로 초기화 함수
  function resetToMain() {
  screenResult.style.display = "none";
  screenMain.style.display = "block";

  // 결과 화면 초기화
  resultTitle.textContent = "";
  resultImage.src = ""; 
}

});
