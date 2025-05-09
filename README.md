# 날씨 앱

Open-Meteo API를 사용하여 서울의 현재 날씨, 12시간 예보 및 7일 예보를 표시하는 React.js 날씨 애플리케이션입니다.

## 과제 내용
현재 마크업과 API 호출은 구현되어 있어요!

- [ ] DailyForcast.js 컴포넌트 완성하기
- [ ] CurrentWeather.js 컴포넌트 완성하기
- [ ] HourlyForcast.js 컴포넌트 완성하기
- [ ] utils/weather.js 내 데이터 포맷팅 함수 2개 완성하기

### 요렇게 만들기
<img width="300" alt="image" src="https://github.com/user-attachments/assets/0552982d-b3b1-4092-828a-77d38ddaa1f6" />

## API 구조

다음 엔드포인트로 Open-Meteo API를 사용합니다:

```
https://api.open-meteo.com/v1/forecast?latitude=37.566&longitude=126.9784&hourly=temperature_2m,weather_code&daily=weather_code,temperature_2m_max&timezone=Asia%2FTokyo&forecast_days=7
```

### API 매개변수:
- `latitude`, `longitude`: 서울 좌표 (37.566°N, 126.9784°E)
- `hourly`: 시간별 날씨 데이터 포함:
  - `temperature_2m`: 섭씨 온도
  - `weather_code`: 날씨 상태 코드
- `daily`: 일별 날씨 데이터 포함:
  - `weather_code`: 일별 날씨 상태 코드
  - `temperature_2m_max`: 일 최고 기온
- `timezone`: Asia/Tokyo
- `forecast_days`: 7일 예보

## 프로젝트 구조

```
alom-08/README.md
src/
├── components/
│ ├── CurrentWeather.js # 현재 날씨 표시
│ ├── HourlyForecast.js # 12시간 예보
│ └── DailyForecast.js # 7일 예보
├── styles/
│ └── StyledComponents.js # Styled-components 정의
├── utils/
│ └── weather.js # 날씨 데이터 처리 유틸리티
└── App.js # 메인 애플리케이션 컴포넌트
```

## 컴포넌트

### 1. CurrentWeather
- 현재 기온과 날씨 상태 표시
- Props: `weatherData`, `isLoading`

### 2. HourlyForecast
- 12시간 날씨 예보를 가로로 표시
- Props: `weatherData`
- 각 시간별 시간, 기온, 날씨 상태 표시

### 3. DailyForecast
- 7일 날씨 예보를 세로로 표시
- Props: `weatherData`
- 각 일자별 날짜, 날씨 상태, 기온 표시

## 유틸리티 함수

`utils/weather.js`에 위치:

### 1. getWeatherDescription(code)
- 날씨 코드를 한글 설명으로 변환
- 입력: 날씨 코드 (숫자)
- 출력: 한글 날씨 설명 (문자열)

### 2. formatHourlyData(weatherData)
- API 원시 데이터를 시간별 예보 형식으로 처리
- 입력: API 날씨 데이터
- 출력: 12시간 예보 배열:
  - 시간 (시 형식)
  - 기온
  - 날씨 코드

### 3. formatDailyData(weatherData)
- API 원시 데이터를 일별 예보 형식으로 처리
- 입력: API 날씨 데이터
- 출력: 7일 예보 배열:
  - 날짜 (한국어 형식)
  - 날씨 코드
  - 기온

## 스타일링

styled-components를 사용한 스타일링:
- 반응형 레이아웃
- 그라데이션 배경
- 반투명 예보 컨테이너

## 날씨 코드

날씨 상태는 다음과 같은 한글 설명으로 매핑됩니다:

```
{
  0: "맑음",
  1: "대체로 맑음",
  2: "부분적으로 흐림",
  3: "흐림",
  45: "안개",
  48: "짙은 안개",
  51: "약한 이슬비",
  53: "보통 이슬비",
  55: "강한 이슬비",
  61: "약한 비",
  63: "보통 비",
  65: "강한 비",
  71: "약한 눈",
  73: "보통 눈",
  75: "강한 눈"
}
```

## 힌트

### 1. API 호출

```
// App.js에서 API 호출 구현

useEffect(() => {
  fetch(API_URL)
  .then((response) => response.json())
  .then((data) => {
    setWeatherData(data);
    setIsLoading(false);
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error);
    setIsLoading(false);
  });
}, []);
```

### 2. 날씨 코드 매핑
```
// utils/weather.js에서 상수 매핑 구현

const weatherCodes = {
  0: "맑음",
  1: "대체로 맑음",
  2: "부분적으로 흐림",
  // ... 기타 날씨 코드
};

// 매핑 함수
export const getWeatherDescription = (code) => {
  return weatherCodes[code] || "알 수 없음";
};
```
