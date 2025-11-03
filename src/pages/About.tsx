import { useEffect, useState } from "react";
import { AuthApi, UserApi } from "../api";

export const About: React.FC = () => {
  const [versionUser, setVersionUser] = useState<string>("");
  const [versionAuth, setVersionAuth] = useState<string>("");
  
    useEffect(() => {
      const fetchVersionAuth = async () => {
          try {
            const response = await AuthApi.InfoService.getInfoVersion();
            setVersionAuth(response);
          } catch (err) {
            console.error("Ошибка при запросе версии:", err);
          }
        };

        const fetchVersionUser = async () => {
          try {
            const response = await UserApi.InfoService.getInfoVersion();
            setVersionUser(response);
          } catch (err) {
            console.error("Ошибка при запросе версии:", err);
          }
        };
      
        fetchVersionAuth();
        fetchVersionUser();
    }, []);
  
  return (
      <>
      <h1>О сайте</h1>
      <p>Версия User сервиса: {versionUser || "загрузка..."}</p>
      <p>Версия Auth сервиса: {versionAuth || "загрузка..."}</p>
      </>
    );
};