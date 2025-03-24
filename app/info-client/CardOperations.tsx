import { View, Text, TouchableOpacity } from "react-native";
import { Fragment } from "react";
import { CreditCard } from "lucide-react-native";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "@/styles/info-client.styles";
import ItemOperationSection from "@/components/molecules/items/ItemOperationSection";
import ItemOperationDetail from "@/components/molecules/items/ItemOperationDetail";
import Divider from "@/components/atoms/Divider";
import { Client } from "@/components/molecules/items/ItemInfoClient";
import { router } from "expo-router";
import Button from "@/components/molecules/buttons/Button";
import { SVG } from "@/constants/assets";

export default function CardOperations({ client }: { client: Client | null }) {
  const { translations } = useLanguage();

  const handleManage = () => {
    if (client) {
      router.push(`/gestion/${client.clientId}`);
    }
  };

  return (
    <View>
      <View style={styles.operationsContainer}>
        {translations.operationTypes.map((operation, index) => (
          <Fragment key={operation.code}>
            <ItemOperationSection
              title={operation.label}
              icon={<SVG.CARD width={25} height={25}/>}
            >
              {client?.operations.map((operationDetail) => (
                <Fragment key={operationDetail.operationId}>
                  <ItemOperationDetail operation={operationDetail} />
                </Fragment>
              ))}
            </ItemOperationSection>

            {index < translations.operationTypes.length - 1 && (
              <Divider orientation="horizontal" color="#E6E6E7" />
            )}
          </Fragment>
        ))}
      </View>

      <Button
        text={translations.client.manage}
        onPress={handleManage}
        customStyleContainer={styles.button}
      />
    </View>
  );
}