document.addEventListener('DOMContentLoaded', function() {
    // 檢測元素的中間是否進入視窗
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      var windowHeight = (window.innerHeight || document.documentElement.clientHeight);

      // 檢測元素的中間是否在視窗內
      var elementMiddle = rect.top + rect.height / 2;

      return (
        elementMiddle >= 0 &&
        elementMiddle <= windowHeight
      );
    }

    // 初始化圓餅圖的函數
    function initPieChart() {
      var ctx = document.getElementById('skillsChart').getContext('2d');
      var skillsChart = new Chart(ctx, {
        type: 'pie', // 圓餅圖類型
        data: {
          labels: ['後端', '前端', '資料庫', '其他語言'], // 技能標籤
          datasets: [{
            data: [50, 20, 20, 10], // 對應每個技能的百分比
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          animation: {
            duration: 1500, // 動畫持續時間，設定為3000毫秒（3秒）
            easing: 'easeOutBounce' // 可以選擇其他的緩動效果
          },
          plugins: {
            legend: {
              position: 'top', // 圓餅圖的標籤位置
            },
            datalabels: {
              formatter: (value, ctx) => {
                let label = ctx.chart.data.labels[ctx.dataIndex]; // 獲取標籤名稱
                return label + '\n' + value + '%'; // 顯示標籤 + 百分比
              },
              color: '#000', // 標籤文字顏色
              font: {
                weight: 'bold',
                size: 14
              },
              align: 'center',
              anchor: 'center'
            }
          }
        },
        plugins: [ChartDataLabels] // 啟用 datalabels 插件
      });
    }

    // 當滾動到圓餅圖區域時觸發動畫
    var pieChartSection = document.getElementById('skillsChart'); // 圓餅圖的 canvas 元素
    var hasAnimatedPie = false; // 確保動畫只執行一次

    window.addEventListener('scroll', function() {
      if (isElementInViewport(pieChartSection) && !hasAnimatedPie) {
        initPieChart(); // 初始化圓餅圖
        hasAnimatedPie = true; // 防止重複觸發動畫
      }
    });
  });