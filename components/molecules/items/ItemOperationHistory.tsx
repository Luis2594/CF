// import React, { useRef, useState } from "react";
// import { View, Text, TouchableOpacity, Animated } from "react-native";
// import { styles } from "@/styles/components/itemOperationHistory.styles";
// import { ChevronDown, ChevronUp, DollarSign } from "lucide-react-native";

// export interface Management {
//   id: string;
//   date: string;
//   action: string;
//   result: string;
//   comment: string;
//   manager: string;
//   portfolio: string;
//   contactPhone: string;
// }

// interface HistoryItemProps {
//   management: Management;
//   index: number;
// }

// export default function ItemOperationHistory({
//   management,
//   index,
// }: HistoryItemProps) {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const animationHeight = useRef(new Animated.Value(0)).current;

//   const toggleExpand = () => {
//     setIsExpanded(!isExpanded);
//     Animated.timing(animationHeight, {
//       toValue: isExpanded ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   return (
//     <View style={styles.historyItem}>
//       <TouchableOpacity onPress={toggleExpand}>
//         <View style={styles.historyHeader}>
//           <DollarSign size={24} color="#FF3B30" />
//           <Text style={styles.historyTitle}>
//             Gestión {String(index + 1).padStart(2, "0")}
//           </Text>
//           {isExpanded ? (
//             <ChevronUp size={24} color="#666" />
//           ) : (
//             <ChevronDown size={24} color="#666" />
//           )}
//         </View>
//       </TouchableOpacity>

//       <Animated.View
//         style={[
//           styles.historyDetails,
//           {
//             maxHeight: animationHeight.interpolate({
//               inputRange: [0, 1],
//               outputRange: [0, 500],
//             }),
//             opacity: animationHeight,
//             overflow: "hidden",
//           },
//         ]}
//       >
//         <View style={styles.historyRow}>
//           <Text style={styles.historyLabel}></Text>
//           <Text style={styles.historyValue}>{management.date}</Text>
//         </View>
//         <View style={styles.historyRow}>
//           <Text style={styles.historyLabel}></Text>
//           <Text style={styles.historyValue}>{management.action}</Text>
//         </View>
//         <View style={styles.historyRow}>
//           <Text style={styles.historyLabel}></Text>
//           <Text style={styles.historyValue}>{management.result}</Text>
//         </View>
//         <View style={styles.historyRow}>
//           <Text style={styles.historyLabel}></Text>
//           <Text style={styles.historyValue}>{management.comment}</Text>
//         </View>
//         <View style={styles.historyRow}>
//           <Text style={styles.historyLabel}></Text>
//           <Text style={styles.historyValue}>{management.contactPhone}</Text>
//         </View>
//       </Animated.View>
//     </View>
//   );
// }

import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "@/styles/components/itemOperationHistory.styles";
import { CreditCard } from "lucide-react-native";
import Divider from "@/components/atoms/Divider";
import { SVG } from "@/constants/assets";

export interface Management {
  id: string;
  date: string;
  action: string;
  result: string;
  comment: string;
  manager: string;
  portfolio: string;
  contactPhone: string;
}

interface HistoryItemProps {
  management: Management;
  index: number;
}

export default function ItemOperationHistory({ management }: HistoryItemProps) {
  const [expanded, setExpanded] = useState(false);

  const renderDetail = (
    label: string,
    value: string | number,
    isMoney?: boolean
  ) => (
    <View style={styles.operationRow}>
      <Text style={styles.operationLabel}>{label}</Text>
      <Text style={styles.operationValue}>
        {isMoney ? `₡${value.toLocaleString()}` : value}
      </Text>
    </View>
  );

  return (
    <View style={styles.cardContainer}>
      <View>
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleContainer}>
            <CreditCard size={20} color="#FF3B30" />
            <View>
              <Text style={styles.cardTitle}>Gestión {management.id}</Text>
            </View>
          </View>
        </View>

        <Divider orientation="horizontal" color="#E6E6E7" />

        <View style={styles.operationDetails}>
          {renderDetail("Fecha gestión", management.date)}
          {renderDetail("Acción", management.action)}
          {renderDetail("Resultado", management.result)}
          {renderDetail("Comentario", management.comment)}
          {renderDetail("Contacto", management.contactPhone)}

          {expanded && <View>{renderDetail("Otro", "Otros")}</View>}
        </View>

        <Divider orientation="horizontal" color="#E6E6E7" />

        <TouchableOpacity
          style={styles.expandButton}
          onPress={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <SVG.CHEVRON_UP width={24} height={24} />
          ) : (
            <SVG.CHEVRON_DOWN width={24} height={24} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
