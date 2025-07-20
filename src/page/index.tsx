import React, {
  useState,
  ChangeEvent,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  Box,
  Container,
  VStack,
  HStack,
  Stack,
  Heading,
  Text,
  Input,
  Select,
  Textarea,
  Button,
  Card,
  CardBody,
  Tag,
  Checkbox,
  useColorModeValue,
} from "@chakra-ui/react";
import { CalendarIcon, CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";

// 型定義
interface TagCompProps {
  text: string;
  size: "sm" | "md" | "lg";
  variant?: "outline" | "solid";
}

interface ContentItem {
  title: string;
  value: string;
}

interface ContentSection {
  sectionTitle: string;
  list: ContentItem[];
}

interface MedicationItem {
  title: string;
  list: string[];
  other: string;
  textarea: string;
  value: string;
}

interface MedicationSection {
  sectionTitle: string;
  items: MedicationItem[];
}

interface ContentData {
  text: string;
  value?: string;
  check?: number;
  type?: string;
}

interface SectionData {
  name: string;
  hospitalName: string;
  content: ContentData[];
  text: string;
}

interface ConsultationItem {
  title: string;
  list: SectionData[];
  value?: string;
}

interface ConsultationSection {
  sectionTitle: string;
  items: ConsultationItem[];
}

interface InfoItem {
  title: string;
  value?: string;
  list?: Array<{ title: string; value: string }>;
}

// タグコンポーネント
const TagComp: React.FC<TagCompProps> = ({ text, size, variant = "solid" }) => {
  const bgColor = useColorModeValue(
    variant === "outline" ? "white" : "blue.500",
    variant === "outline" ? "gray.800" : "blue.600"
  );
  const color = useColorModeValue(
    variant === "outline" ? "gray.700" : "white",
    variant === "outline" ? "gray.100" : "white"
  );
  const borderColor = useColorModeValue("gray.300", "gray.600");

  return (
    <Tag
      size={size}
      variant={variant}
      bg={bgColor}
      color={color}
      borderColor={borderColor}
      borderWidth={variant === "outline" ? "2px" : "0"}
      px={size === "lg" ? 4 : 3}
      py={size === "lg" ? 2 : 1}
      w={"auto"}
      fontWeight={size === "lg" ? "semibold" : "medium"}
    >
      {text}
    </Tag>
  );
};

// メインコンポーネント
const MedicalForm: React.FC = () => {
  const [sumText, setSumText] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 初期データ
  const medicationStatus = ["全て服用済", "概ね服用済み(60%)", "服用忘れあり"];
  const medicationSet = ["1週間分", "次回訪問日まで", "不足分のみ"];

  const [contentTop, setContentTop] = useState<ContentSection[]>([
    {
      sectionTitle: "",
      list: [
        { title: "日付", value: "" },
        { title: "GAF", value: "" },
      ],
    },
    {
      sectionTitle: "バイタル値",
      list: [
        { title: "体温", value: "" },
        { title: "血圧", value: "" },
        { title: "脈", value: "" },
        { title: "Sp02", value: "" },
      ],
    },
  ]);

  const [contentMiddle, setContentMiddle] = useState<MedicationSection[]>([
    {
      sectionTitle: "内服薬",
      items: [
        {
          title: "内服薬服用状況",
          list: medicationStatus,
          other: "その他",
          textarea: "",
          value: "",
        },
        {
          title: "服薬セット",
          list: medicationSet,
          other: "その他",
          textarea: "",
          value: "",
        },
      ],
    },
  ]);

  const [contentMiddleSecond, setContentMiddleSecond] =
    useState<ConsultationSection>({
      sectionTitle: "受診状況",
      items: [
        {
          title: "最終受信日",
          list: [
            {
              name: "精神科",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
            {
              name: "内科",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
            {
              name: "その他",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
          ],
          value: "",
        },
        {
          title: "次回受診日",
          list: [
            {
              name: "精神科",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
            {
              name: "内科",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
            {
              name: "その他",
              hospitalName: "",
              content: [
                { text: "日付", value: "" },
                { text: "処方", value: "", check: 0 },
                { text: "変更", value: "", check: 0 },
              ],
              text: "",
            },
          ],
        },
      ],
    });

  const [info, setInfo] = useState<InfoItem[]>([
    {
      title: "精神状態",
      value: "",
    },
    {
      title: "身体状態",
      value: "",
    },
    {
      title: "生活状況",
      list: [
        { title: "保清", value: "" },
        { title: "食事", value: "" },
        { title: "環境", value: "" },
      ],
    },
    {
      title: "日中活動",
      value: "",
    },
  ]);

  const [infoBottom, setInfoBottom] = useState<boolean>(false);

  const options = ["同行者 1", "同行者 2", "同行者 3", "同行者 4"];

  // カラー設定
  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.100)",
    "linear(to-br, gray.900, gray.800)"
  );
  const cardBg = useColorModeValue("white", "gray.800");
  const sectionBg = {
    blue: useColorModeValue("blue.50", "blue.900"),
    green: useColorModeValue("green.50", "green.900"),
    purple: useColorModeValue("purple.50", "purple.900"),
    orange: useColorModeValue("orange.50", "orange.900"),
  };

  // ハンドラー関数
  const contentTopChangeValueHandler = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      currntNumber: number,
      index: number
    ) => {
      const value = e.target.value;
      const currentValue = [...contentTop];
      currentValue[currntNumber].list[index].value = value;
      setContentTop(currentValue);
    },
    [contentTop]
  );

  const contentMiddleChangeValueHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>, currntNumber: number, index: number) => {
      const value = e.target.value;
      const currentValue = [...contentMiddle];
      currentValue[currntNumber].items[index].value = value;
      setContentMiddle(currentValue);
    },
    [contentMiddle]
  );

  const contentMiddleTextareaChangeValueHandler = useCallback(
    (
      e: ChangeEvent<HTMLTextAreaElement>,
      currntNumber: number,
      index: number
    ) => {
      const value = e.target.value;
      const currentValue = [...contentMiddle];
      currentValue[currntNumber].items[index].textarea = value;
      setContentMiddle(currentValue);
    },
    [contentMiddle]
  );

  const infoChangeValueHandler = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>, index: number, type?: string) => {
      const value = e.target.value;
      const currentValue = [...info];

      if (type !== undefined) {
        if (currentValue[2] && currentValue[2].list) {
          currentValue[2].list[index].value = value;
        }
      } else {
        currentValue[index].value = value;
      }

      setInfo(currentValue);
    },
    [info]
  );

  const generateSumText = useCallback(() => {
    const topText = contentTop
      .map((section) =>
        section.list
          .map((item) =>
            item.value
              ? `${item.title}: ${item.value}${
                  item.title === "Sp02" ? "%" : ""
                }`
              : ""
          )
          .filter(Boolean)
          .join("\n")
      )
      .filter(Boolean)
      .join("\n\n");

    const middleText = contentMiddle
      .map((section) =>
        section.items
          .map((item) => {
            if (!item.value && !item.textarea) return "";
            const otherText =
              item.textarea && item.other
                ? `\n${item.other}: ${item.textarea}`
                : "";
            return `${item.title}: ${item.value || ""}${otherText}`;
          })
          .filter(Boolean)
          .join("\n")
      )
      .filter(Boolean)
      .join("\n\n");

    const middleSecondText = contentMiddleSecond.items
      .map((item) => {
        const sectionText = item.list
          .map((subItem) => {
            const contentText = subItem.content
              .map((content) => {
                const hasValue = !!content.value;
                const hasCheck =
                  content.check !== undefined && content.check !== 0;

                if (content.text === "日付" && !hasValue) return "";
                if (content.text !== "日付" && !hasValue && !hasCheck)
                  return "";

                const valuePart = hasValue ? `${content.value}` : "";
                const checkPart =
                  content.check !== undefined
                    ? content.check === 1
                      ? "あり"
                      : content.check === 0
                      ? "なし"
                      : ""
                    : "";

                return `${content.text}: ${valuePart} ${checkPart}`.trim();
              })
              .filter(Boolean)
              .join("\n  ");

            const hospital = subItem.hospitalName
              ? `病院名: ${subItem.hospitalName}`
              : "";

            const textMessage = subItem.text ? `メモ: ${subItem.text}` : "";

            const parts = [hospital, contentText, textMessage].filter(
              (p) => p && p.trim() !== ""
            );

            if (parts.length === 0) return "";

            return `${subItem.name}\n  ${parts.join("\n  ")}`;
          })
          .filter(Boolean)
          .join("\n\n");

        // 全体が空ならセクションごと省略
        if (!sectionText) return "";

        return `【${item.title}】\n${sectionText}`;
      })
      .filter(Boolean)
      .join("\n\n");

    const infoText = info
      .map((item) => {
        if (item.title === "生活状況" && item.list) {
          const listDetails = item.list
            .filter((subItem) => subItem.value)
            .map((subItem) => `  - ${subItem.title}: ${subItem.value}`)
            .join("\n");
          return listDetails ? `${item.title}:\n${listDetails}` : "";
        } else {
          return item.value ? `${item.title}: ${item.value}` : "";
        }
      })
      .filter(Boolean)
      .join("\n");

    const totalTextMessage = [topText, middleText, middleSecondText, infoText]
      .filter(Boolean)
      .join("\n\n");

    setSumText(totalTextMessage);
  }, [contentMiddle, contentMiddleSecond.items, contentTop, info]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [sumText]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(sumText);
      alert("コピーしました!");
    } catch (err) {
      alert("コピーに失敗しました。");
    }
  };

  const handleChangeCheck = (
    newCheck: 1 | 0,
    itemIndex: number,
    sectionIndex: number,
    contentIndex: number
  ) => {
    setContentMiddleSecond((prev) => {
      const updated = { ...prev };
      const contentItem =
        updated.items[itemIndex].list[sectionIndex].content[contentIndex];

      contentItem.check = newCheck;
      if (newCheck === 0) {
        contentItem.value = ""; // 入力値リセット
      }

      return { ...updated };
    });
  };

  const handleInputChange = (
    newValue: string,
    itemIndex: number,
    sectionIndex: number,
    contentIndex: number
  ) => {
    setContentMiddleSecond((prev) => {
      const updated = { ...prev };
      updated.items[itemIndex].list[sectionIndex].content[contentIndex].value =
        newValue;
      return { ...updated };
    });
  };

  const contentMiddleCheckSwitch = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      currentNum: number,
      index: number,
      num: number
    ) => {
      const value = Number(e.target.value); // 直接数値に変換
      const currentValue = { ...contentMiddleSecond }; // 現在の状態全体をコピー

      // currentValue.items の内部のオブジェクトもスプレッド演算子でコピー
      currentValue.items = currentValue.items.map((item, i) => {
        if (i === currentNum) {
          return {
            ...item,
            list: item.list.map((listItem, j) => {
              if (j === index) {
                return {
                  ...listItem,
                  text: value === 0 ? "" : listItem.text,
                  content: listItem.content.map((contentItem, k) => {
                    if (k === num) {
                      return {
                        ...contentItem,
                        check: value, // 対象のcheck値を更新
                      };
                    }
                    return contentItem;
                  }),
                };
              }
              return listItem;
            }),
          };
        }
        return item;
      });

      setContentMiddleSecond(currentValue); // 状態を更新
    },
    [contentMiddleSecond]
  );

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="container.xl" py={6}>
        {/* ヘッダー */}
        <Card mb={6} boxShadow="xl">
          <CardBody textAlign="center">
            <Heading size="xl" mb={2}>
              医療問診票
            </Heading>
            <Text color="gray.600">必要事項をご記入ください</Text>
          </CardBody>
        </Card>

        <Card boxShadow="lg">
          <CardBody px={2}>
            <VStack spacing={8} align="stretch">
              {/* ContentTop - 基本情報 */}
              <Box>
                <HStack mb={4}>
                  <CalendarIcon color="blue.600" boxSize={6} />
                  <Heading size="md">基本情報</Heading>
                </HStack>
                <VStack spacing={4} align="stretch">
                  {contentTop[0].list.map((item, index) => (
                    <HStack key={index} justifyContent="space-between">
                      <Box w="30%">
                        <TagComp
                          text={item.title}
                          size="md"
                          variant="outline"
                        />
                      </Box>
                      <Box w="65%">
                        {/* {item.title === "同行者" && (
                          <Select
                            placeholder="選択してください"
                            value={item.value}
                            onChange={(e) =>
                              contentTopChangeValueHandler(e, 0, index)
                            }
                            size="md"
                            borderWidth={2}
                            _focus={{ borderColor: "blue.500" }}
                          >
                            {options.map((option, i) => (
                              <option key={i} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                        )} */}
                        {item.title === "日付" && (
                          <Input
                            type="date"
                            value={item.value}
                            onChange={(e) =>
                              contentTopChangeValueHandler(e, 0, index)
                            }
                            size="md"
                            borderWidth={2}
                            _focus={{ borderColor: "blue.500" }}
                          />
                        )}
                        {item.title === "GAF" && (
                          <Input
                            placeholder="数値を入力"
                            value={item.value}
                            onChange={(e) =>
                              contentTopChangeValueHandler(e, 0, index)
                            }
                            size="md"
                            borderWidth={2}
                            _focus={{ borderColor: "blue.500" }}
                          />
                        )}
                      </Box>
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* ContentTopSeconde - バイタル値 */}
              <Box bg={sectionBg.blue} p={2} borderRadius="xl">
                <TagComp text={contentTop[1].sectionTitle} size="lg" />
                <Stack spacing={4} mt={4}>
                  {contentTop[1].list.map((item, index) => (
                    <HStack key={index} justifyContent="space-between">
                      <Box w="30%">
                        <TagComp
                          text={item.title}
                          size="md"
                          variant="outline"
                        />
                      </Box>
                      <HStack w="65%">
                        <Input
                          placeholder={item.title === "Sp02" ? "数値" : "入力"}
                          value={item.value}
                          onChange={(e) =>
                            contentTopChangeValueHandler(e, 1, index)
                          }
                          size="md"
                          borderWidth={2}
                          bg={cardBg}
                          _focus={{ borderColor: "blue.500" }}
                        />
                        {item.title === "Sp02" && <Text>%</Text>}
                      </HStack>
                    </HStack>
                  ))}
                </Stack>
              </Box>

              {/* ContentMiddle - 内服薬 */}
              <Box bg={sectionBg.green} p={2} borderRadius="xl">
                <TagComp text={contentMiddle[0].sectionTitle} size="lg" />
                <VStack spacing={6} mt={4} align="stretch">
                  {contentMiddle[0].items.map((item, index) => (
                    <Box key={index}>
                      <TagComp text={item.title} size="md" variant="outline" />
                      <VStack mt={3} ml={4} align="stretch" spacing={2}>
                        {item.list.map((option, idx) => (
                          <Checkbox
                            key={idx}
                            isChecked={item.value === option}
                            onChange={(e) => {
                              const evt = {
                                target: { value: option },
                              } as ChangeEvent<HTMLInputElement>;
                              contentMiddleChangeValueHandler(evt, 0, index);
                            }}
                            colorScheme="green"
                          >
                            {option}
                          </Checkbox>
                        ))}
                        <Box mt={3}>
                          <Text fontSize="sm" color="gray.600" mb={1}>
                            {item.other}
                          </Text>
                          <Textarea
                            placeholder="詳細を入力してください"
                            value={item.textarea}
                            onChange={(e) =>
                              contentMiddleTextareaChangeValueHandler(
                                e,
                                0,
                                index
                              )
                            }
                            size="sm"
                            bg={cardBg}
                            borderWidth={2}
                            _focus={{ borderColor: "green.500" }}
                          />
                        </Box>
                      </VStack>
                    </Box>
                  ))}
                </VStack>
              </Box>

              {/* ContentInfo - 情報 */}
              <Box bg={sectionBg.purple} p={2} borderRadius="xl">
                <TagComp text="情報" size="lg" />
                <VStack spacing={4} mt={4} align="stretch">
                  {info.map((item, index) => (
                    <HStack key={index} align="flex-start" spacing={4}>
                      <TagComp text={item.title} size="md" variant="outline" />
                      {item.title === "生活状況" ? (
                        <VStack align="stretch" flex={1}>
                          <Checkbox
                            onChange={() => setInfoBottom(!infoBottom)}
                            colorScheme="purple"
                          >
                            詳細を入力
                          </Checkbox>
                          {infoBottom && item.list && (
                            <VStack spacing={4} mt={4} align="stretch">
                              {item.list.map((subItem, subIndex) => (
                                <Box key={subIndex}>
                                  <TagComp
                                    text={subItem.title}
                                    size="md"
                                    variant="outline"
                                  />
                                  <Textarea
                                    mt={2}
                                    placeholder={`${subItem.title}について記入してください`}
                                    value={subItem.value}
                                    onChange={(e) =>
                                      infoChangeValueHandler(
                                        e,
                                        subIndex,
                                        "生活状況"
                                      )
                                    }
                                    bg={cardBg}
                                    borderWidth={2}
                                    _focus={{ borderColor: "purple.500" }}
                                  />
                                </Box>
                              ))}
                            </VStack>
                          )}
                        </VStack>
                      ) : (
                        <Textarea
                          flex={1}
                          placeholder={`${item.title}を記入してください`}
                          value={item.value || ""}
                          onChange={(e) => infoChangeValueHandler(e, index)}
                          bg={cardBg}
                          borderWidth={2}
                          _focus={{ borderColor: "purple.500" }}
                        />
                      )}
                    </HStack>
                  ))}
                </VStack>
              </Box>

              {/* ContentMiddleSecond - 受診状況 */}
              <Box bg={sectionBg.orange} p={2} borderRadius="xl">
                <TagComp text={contentMiddleSecond.sectionTitle} size="lg" />
                {contentMiddleSecond.items.map((item, itemIndex) => (
                  <Box key={itemIndex} mt={4}>
                    <HStack>
                      <TagComp text={item.title} size="md" variant="outline" />
                    </HStack>

                    <VStack spacing={4} mt={4} align="stretch">
                      {item.list.map((section, sectionIndex) => (
                        <Box
                          key={sectionIndex}
                          bg={cardBg}
                          p={4}
                          borderRadius="lg"
                          boxShadow="sm"
                        >
                          <VStack align="flex-start" spacing={4}>
                            <TagComp text={section.name} size="md" />
                            <Input
                              size="sm"
                              w={"full"}
                              placeholder="病院名など"
                              value={section.hospitalName}
                              onChange={(e) => {
                                const e_value = e.target.value;
                                setContentMiddleSecond((prev) => {
                                  const updated = { ...prev };
                                  updated.items = [...prev.items];
                                  updated.items[itemIndex] = {
                                    ...updated.items[itemIndex],
                                    list: [...updated.items[itemIndex].list],
                                  };
                                  updated.items[itemIndex].list[sectionIndex] =
                                    {
                                      ...updated.items[itemIndex].list[
                                        sectionIndex
                                      ],
                                      hospitalName: e_value,
                                    };
                                  return updated;
                                });
                              }}
                              borderWidth={2}
                              _focus={{ borderColor: "orange.500" }}
                            />
                          </VStack>

                          <VStack mt={3} spacing={3} align="stretch">
                            {section.content.map((content, contentIndex) => (
                              <HStack
                                key={contentIndex}
                                align="flex-start"
                                spacing={4}
                              >
                                <Box w={"80px"}>
                                  <TagComp
                                    text={content.text}
                                    size="md"
                                    variant="outline"
                                  />
                                </Box>

                                {content.text === "日付" && (
                                  <Input
                                    type="date"
                                    size="sm"
                                    w={"200px"}
                                    borderWidth={2}
                                    _focus={{ borderColor: "orange.500" }}
                                    onChange={(e) => {
                                      const e_value = e.target.value;
                                      setContentMiddleSecond((prev) => {
                                        const updated = { ...prev };
                                        updated.items = [...prev.items];
                                        updated.items[itemIndex] = {
                                          ...updated.items[itemIndex],
                                          list: [
                                            ...updated.items[itemIndex].list,
                                          ],
                                        };
                                        updated.items[itemIndex].list[
                                          sectionIndex
                                        ] = {
                                          ...updated.items[itemIndex].list[
                                            sectionIndex
                                          ],
                                          content: [
                                            ...updated.items[itemIndex].list[
                                              sectionIndex
                                            ].content,
                                          ],
                                        };
                                        updated.items[itemIndex].list[
                                          sectionIndex
                                        ].content[contentIndex] = {
                                          ...updated.items[itemIndex].list[
                                            sectionIndex
                                          ].content[contentIndex],
                                          value: e_value,
                                        };
                                        return updated;
                                      });
                                    }}
                                  />
                                )}
                                {content.text === "処方" && (
                                  <HStack spacing={4}>
                                    <Checkbox
                                      colorScheme="orange"
                                      value={1} // "あり" のとき → 1
                                      isChecked={content.check === 1}
                                      onChange={(e) =>
                                        contentMiddleCheckSwitch(
                                          e,
                                          itemIndex, // currentNum → itemsのインデックス
                                          sectionIndex, // index → listのインデックス
                                          contentIndex // num → contentのインデックス
                                        )
                                      }
                                    >
                                      あり
                                    </Checkbox>
                                    <Checkbox
                                      colorScheme="orange"
                                      value={0} // "なし" のとき → 0
                                      isChecked={content.check === 0}
                                      onChange={(e) =>
                                        contentMiddleCheckSwitch(
                                          e,
                                          itemIndex,
                                          sectionIndex,
                                          contentIndex
                                        )
                                      }
                                    >
                                      なし
                                    </Checkbox>
                                  </HStack>
                                )}
                                {content.text === "変更" && (
                                  <VStack
                                    align="stretch"
                                    spacing={2}
                                    w={"full"}
                                  >
                                    <HStack justifyContent={"start"}>
                                      <Checkbox
                                        w={20}
                                        colorScheme="orange"
                                        isChecked={content.check === 1}
                                        onChange={() =>
                                          handleChangeCheck(
                                            1,
                                            itemIndex,
                                            sectionIndex,
                                            contentIndex
                                          )
                                        }
                                      >
                                        あり
                                      </Checkbox>
                                      <Input
                                        size="sm"
                                        w={"full"}
                                        placeholder="変更内容"
                                        value={content.value}
                                        isDisabled={content.check !== 1}
                                        onChange={(e) =>
                                          handleInputChange(
                                            e.target.value,
                                            itemIndex,
                                            sectionIndex,
                                            contentIndex
                                          )
                                        }
                                        borderWidth={2}
                                        _focus={{ borderColor: "orange.500" }}
                                      />
                                    </HStack>
                                    <Checkbox
                                      colorScheme="orange"
                                      isChecked={content.check === 0}
                                      onChange={() =>
                                        handleChangeCheck(
                                          0,
                                          itemIndex,
                                          sectionIndex,
                                          contentIndex
                                        )
                                      }
                                    >
                                      なし
                                    </Checkbox>
                                  </VStack>
                                )}
                              </HStack>
                            ))}
                          </VStack>
                        </Box>
                      ))}
                    </VStack>
                  </Box>
                ))}
              </Box>

              {/* ボタン */}
              <HStack justifyContent="flex-end" spacing={4}>
                <Button
                  leftIcon={<ExternalLinkIcon />}
                  colorScheme="blue"
                  size="lg"
                  onClick={generateSumText}
                  boxShadow="lg"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="all 0.2s"
                >
                  出力
                </Button>
                <Button
                  leftIcon={<CopyIcon />}
                  colorScheme="teal"
                  size="lg"
                  onClick={handleCopy}
                  boxShadow="lg"
                  _hover={{ transform: "scale(1.05)" }}
                  transition="all 0.2s"
                >
                  コピー
                </Button>
              </HStack>

              {/* 出力結果 */}
              {sumText && (
                <Box bg="gray.50" p={6} borderRadius="xl">
                  <Heading size="md" mb={3}>
                    出力結果
                  </Heading>
                  <Textarea
                    ref={textareaRef}
                    value={sumText}
                    isReadOnly
                    bg={cardBg}
                    borderWidth={2}
                    resize="none"
                  />
                </Box>
              )}
            </VStack>
          </CardBody>
        </Card>
      </Container>
    </Box>
  );
};

export default MedicalForm;
