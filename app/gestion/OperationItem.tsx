import { View } from "react-native";
import React, { useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Operation } from "@/components/molecules/items/ItemOperationDetail";
import TagOperation from "@/components/atoms/TagOperation";
import Dropdown, { DropdownItem } from "@/components/organism/Dropdown";
import CustomInput from "@/components/organism/CustomInput";
import { styles } from "@/styles/gestion.styles";
import { ResultCodes } from "@/hooks/useGestion";
import { RequestOperationData } from "./[id]";
import { encryptText } from "@/utils/encryption";
import { formatDate, formatToTwoDecimals } from "@/utils/utils";

interface ErrorsInput {
  result?: string;
  montoLocal?: string;
  montoExt?: string;
  date?: string;
}

const OperationItem = React.forwardRef(
  (
    {
      operation,
      resultCodes,
      resultsItems,
    }: {
      operation: Operation;
      resultCodes: Array<ResultCodes>;
      resultsItems: Array<DropdownItem>;
    },
    ref
  ) => {
    const { translations } = useLanguage();
    const initResult = resultCodes.find((rc) => rc.promise);
    const [result, setResult] = useState<ResultCodes | undefined>(initResult);
    const [montoLocal, setMontoLocal] = useState("");
    const [montoExt, setMontoExt] = useState("");
    const [date, setDate] = useState("");
    const [errorsInput, setErrorsInput] = useState<ErrorsInput>();

    const clearInputError = (key: keyof ErrorsInput) => {
      setErrorsInput((prevErrors) => ({
        ...prevErrors,
        [key]: undefined,
      }));
    };

    const isPromise = (): boolean => {
      return !!result?.promise;
    };

    const currentErrorsInput = (): boolean => {
      if (!result?.promise) {
        return false;
      }
      setErrorsInput({});
      const currentErrorsInput: ErrorsInput = {
        result: !result ? translations.gestion.errors.result : undefined,
        montoLocal: !montoLocal
          ? translations.gestion.errors.localAmount
          : undefined,
        montoExt: !montoExt ? translations.gestion.errors.extAmount : undefined,
        date: !date ? translations.gestion.errors.paymentDate : undefined,
      };
      setErrorsInput(currentErrorsInput);

      return Object.values(currentErrorsInput).some(
        (error) => error !== undefined
      );
    };

    const getDataToSend = (): RequestOperationData => {
      const formattedMontoLocal = formatToTwoDecimals(montoLocal);
      const formattedMontoExt = formatToTwoDecimals(montoExt);

      const encryptedLocalCurrency = encryptText(formattedMontoLocal);
      const encryptedForeignCurrency = encryptText(formattedMontoExt);

      return {
        operationId: encryptText(operation.operationId),
        existPromise: result?.promise ? encryptText("1") : encryptText("0"),
        foreignCurrency: encryptedForeignCurrency,
        localCurrency: encryptedLocalCurrency,
        promiseDate: result?.promise
          ? encryptText(formatDate(date))
          : undefined,
      };
    };


    // TODO DELETE It's to show data decrypt
    const getDataToSendSin = (): RequestOperationData => {
      const formattedMontoLocal = formatToTwoDecimals(montoLocal);
      const formattedMontoExt = formatToTwoDecimals(montoExt);
      console.log("data detail: ", {
        operationId: operation.operationId,
        existPromise: result?.promise ? "1" : "0",
        foreignCurrency: formattedMontoExt,
        localCurrency: formattedMontoLocal,
        promiseDate: result?.promise ? formatDate(date) : undefined,
      });
      return {
        operationId: operation.operationId,
        existPromise: (result?.promise || false).toString(),
        foreignCurrency: formattedMontoExt,
        localCurrency: formattedMontoLocal,
        promiseDate: formatDate(date),
      };
    };

    React.useImperativeHandle(ref, () => ({
      currentErrorsInput,
      isPromise,
      getDataToSend,
      getDataToSendSin,
    }));

    return (
      <View>
        <TagOperation
          text={`${translations.gestion.operation} ${operation.operationId} - ${operation.operationType}`}
        />
        <View style={styles.containerInputs}>
          <Dropdown
            label={translations.gestion.result}
            items={resultsItems}
            selectedValue={result?.id || ""}
            onSelect={(item) => {
              const findResultSelected = resultCodes.find(
                (rc) => rc.id === item.value
              );
              setResult(findResultSelected);
            }}
            required
            containerStyle={styles.spacing}
            labelStyle={styles.label}
          />

          {result?.promise && (
            <>
              <CustomInput
                label={translations.gestion.localAmount}
                value={montoLocal}
                onChangeText={(text) => {
                  setMontoLocal(text);
                  clearInputError("montoLocal");
                }}
                placeholder="0.00"
                isRequired
                currency={operation.currencySymbol}
                errorMessage={errorsInput?.montoLocal}
              />

              <CustomInput
                label={translations.gestion.extAmount}
                value={montoExt}
                onChangeText={(text) => {
                  setMontoExt(text);
                  clearInputError("montoExt");
                }}
                placeholder="0.00"
                isRequired
                currency={operation.currencySymbol}
                errorMessage={errorsInput?.montoExt}
              />

              <CustomInput
                label={translations.gestion.paymentDate}
                value={date}
                onChangeText={(text) => {
                  setDate(text);
                  clearInputError("date");
                }}
                placeholder="00/00/0000"
                isRequired
                isDate
                errorMessage={errorsInput?.date}
              />
            </>
          )}
        </View>
      </View>
    );
  }
);

export default OperationItem;
