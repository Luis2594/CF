import { View } from "react-native";
import { Fragment } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { styles } from "@/styles/info-client.styles";
import ItemOperationSection from "@/components/molecules/items/ItemOperationSection";
import ItemOperationDetail, {
  Operation,
} from "@/components/molecules/items/ItemOperationDetail";
import Divider from "@/components/atoms/Divider";
import { router } from "expo-router";
import Button from "@/components/molecules/buttons/Button";
import { SVG } from "@/constants/assets";
import { Client } from "@/hooks/useClient";

export default function CardOperations({ client }: { client: Client | null }) {
  const { translations } = useLanguage();
  const operations = client?.operations || ([] as Array<Operation>);

  const groupedOperations = Object.values(
    operations.reduce((acc, operation) => {
      if (!acc[operation.operationType]) {
        acc[operation.operationType] = {
          operationType: operation.operationType,
          operationId: operation.operationId,
          operations: [],
        };
      }
      acc[operation.operationType].operations.push(operation);
      return acc;
    }, {} as Record<string, { operationType: string; operationId: string; operations: Operation[] }>)
  );

  const handleManage = () => {
    if (client) {
      router.push(`/gestion/${client.clientId}`);
    }
  };

  return (
    <View>
      <View style={styles.operationsContainer}>
        {groupedOperations.map((operation, index) => (
          <Fragment key={`${operation.operationId} - ${index}`}>
            <ItemOperationSection
              title={operation.operationType}
              icon={
                operation.operationType === "Préstamo" ? (
                  <SVG.BAG width={25} height={25} />
                ) : (
                  <SVG.CARD width={25} height={25} />
                )
              }
            >
              {operation.operations.map((operationDetail, index) => (
                <Fragment key={`${operationDetail.operationId} - ${index}`}>
                  <ItemOperationDetail operation={operationDetail} />
                </Fragment>
              ))}
            </ItemOperationSection>

            {index < groupedOperations.length - 1 && (
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
