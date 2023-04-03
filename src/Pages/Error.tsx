import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page">
      <h1>Страница не существует!</h1>
      <p>Вы можете перейти на главную</p>
    </div>
  );
}