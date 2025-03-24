import { View } from "react-native";
import { styles } from "@/styles/info-client.styles";
import { Client } from "@/components/molecules/items/ItemInfoClient";
import ItemOperationHistory from "@/components/molecules/items/ItemOperationHistory";

export default function CardHistory({ client }: { client: Client | null }) {
  return (
    <View>
      {client?.managements.map((management, index) => (
        <ItemOperationHistory
          key={management.id}
          management={management}
          index={index}
        />
      ))}
    </View>
  );
}
