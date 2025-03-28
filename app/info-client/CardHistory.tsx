import { View } from "react-native";
import ItemOperationHistory from "@/components/molecules/items/ItemOperationHistory";
import { Client } from "@/hooks/useClient";

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
