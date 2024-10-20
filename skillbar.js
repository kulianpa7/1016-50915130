document.addEventListener('DOMContentLoaded', function() {
    // 檢測元素的中間是否進入視窗
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = (window.innerHeight || document.documentElement.clientHeight);

      // 這裡檢測元素的中間是否在視窗內
      var elementMiddle = rect.top + rect.height / 6;

      return (
        elementMiddle >= 0 &&
        elementMiddle <= windowHeight
      );
    }

    // 限制內部數字更新的頻率
    function updateProgressText(bar, value) {
      bar.innerHTML = Math.round(value) + '%';
    }

    // 啟動動畫的函數
    function animateProgressBars() {
      var progressBars = document.querySelectorAll('.progress-bar');
      progressBars.forEach(function(bar) {
        var percentage = bar.getAttribute('data-percentage');

        // 動畫進度條寬度
        anime({
          targets: bar,
          width: percentage + '%', // 設置進度條的寬度
          easing: 'easeInOutQuad', // 平滑的加速減速效果
          duration: 1900 // 動畫持續時間
        });

        // 動畫內部數字的變化
        anime({
          targets: {
            value: 0
          },
          value: percentage,
          easing: 'easeInOutQuad', // 與進度條相同的效果
          duration: 1500, // 動畫持續時間
          round: 1, // 進度顯示取整
          update: function(anim) {
            updateProgressText(bar, anim.animations[0].currentValue); // 動態更新內部文本
          }
        });
      });
    }

    // 當滾動到技能區域時觸發動畫
    var skillsSection = document.getElementById('skills');
    var hasAnimated = false; // 確保動畫只執行一次

    window.addEventListener('scroll', function() {
      if (isElementInViewport(skillsSection) && !hasAnimated) {
        animateProgressBars();
        hasAnimated = true; // 防止重複觸發動畫
      }
    });
  });