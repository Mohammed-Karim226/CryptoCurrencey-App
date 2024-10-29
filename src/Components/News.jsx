import { useState } from "react";
import { Select, Typography, Row, Col, Card, Spin } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 12,
  });
  const { data } = useGetCryptosQuery(100);
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  if (isFetching) return <Spin size="large" tip="Loading News..." />;

  return (
    <>
      <Row gutter={[24, 24]} style={{ padding: "20px" }}>
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              style={{ width: "30%", marginBottom: "20px", height: "70%" }}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency" key="Cryptocurrency">
                Cryptocurrency
              </Option>
              {data?.data?.coins?.map((currency) => (
                <Option value={currency?.name} key={currency?.name}>
                  {currency?.name}
                </Option>
              ))}
            </Select>
          </Col>
        )}
        {cryptoNews?.articles?.map((article, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card
              hoverable
              className="news-card"
              style={{
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              cover={
                <img
                  alt={article.title}
                  src={article.urlToImage || demoImage}
                  style={{
                    height: "200px",
                    objectFit: "cover",
                    filter: "brightness(0.9)",
                    transition: "0.3s ease",
                  }}
                  className="news-image"
                />
              }
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                <div className="news-content" style={{ padding: "10px 0" }}>
                  <Title
                    className="news-title"
                    level={4}
                    style={{ marginBottom: "10px" }}
                  >
                    {article.title}
                  </Title>
                  <Text>
                    {article?.description
                      ? article.description.length > 70
                        ? `${article.description.slice(0, 70)}....`
                        : article.description
                      : "No description available"}
                  </Text>
                  <div
                    className="provider-container"
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text className="provider-name" style={{ color: "#555" }}>
                      {article.author || "Unknown Author"}
                    </Text>
                    <Text style={{ fontSize: "0.9rem", color: "#888" }}>
                      {moment(article.publishedAt).format("MMM DD, YYYY")}
                    </Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))}
      </Row>

      <style jsx>{`
        .select-news {
          border-radius: 8px;
          padding: 8px;
        }
        .news-card:hover .news-image {
          filter: brightness(0.75);
          transform: scale(1.05);
        }
        .news-card:hover .news-title {
          color: #1890ff;
        }
        .news-card {
          transition: box-shadow 0.3s ease;
        }
        .news-card:hover {
          box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </>
  );
};

export default News;
