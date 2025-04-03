import { View } from "react-native";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "@/styles/info-client.styles";
import Divider from "@/components/atoms/Divider";
import TabItem from "@/components/molecules/items/TabItem";

export type TabType = "information" | "operations" | "history";

interface TabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const { translations } = useLanguage();

  return (
    <View style={{ width: "100%", paddingHorizontal: 22 }}>
      <View style={styles.shadowWrapper}>
        <View style={styles.containerInfoTabs}>
          <View style={styles.tabs}>
            <TabItem
              label={translations.client.tabs.information}
              isActive={activeTab === "information"}
              onPress={() => setActiveTab("information")}
            />
            <Divider orientation="vertical" thickness={1} />
            <TabItem
              label={translations.client.tabs.operations}
              isActive={activeTab === "operations"}
              onPress={() => setActiveTab("operations")}
            />
            <Divider orientation="vertical" thickness={1} />
            <TabItem
              label={translations.client.tabs.history}
              isActive={activeTab === "history"}
              onPress={() => setActiveTab("history")}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Tabs;
