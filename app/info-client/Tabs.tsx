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
    <View style={styles.shadowWrapper}>
      <View style={styles.containerInfoTabs}>
        <View style={styles.tabs}>
          <TabItem
            label={"Información"}
            isActive={activeTab === "information"}
            onPress={() => setActiveTab("information")}
          />
          <Divider orientation="vertical" />
          <TabItem
            label={"Operaciones"}
            isActive={activeTab === "operations"}
            onPress={() => setActiveTab("operations")}
          />
          <Divider orientation="vertical" />
          <TabItem
            label={"Historial"}
            isActive={activeTab === "history"}
            onPress={() => setActiveTab("history")}
          />
        </View>
      </View>
    </View>
  );
};

export default Tabs;
