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
      minPromiseAmountLocal,
      minPromiseAmountForeing,
    }: {
      operation: Operation;
      resultCodes: Array<ResultCodes>;
      resultsItems: Array<DropdownItem>;
      minPromiseAmountLocal?: number;
      minPromiseAmountForeing?: number;
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

    const hasForeign =
      operation.foreignCurrency ||
      operation.foreignCurrencyCode ||
      operation.foreignCurrencyISO ||
      operation.foreignCurrencySymbol;

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
      if (!isPromise()) {
        return false;
      }
      setErrorsInput({});
      const currentErrorsInput: ErrorsInput = {
        result: !result ? translations.gestion.errors.result : undefined,
        montoLocal: !montoLocal
          ? translations.gestion.errors.localAmount
          : minPromiseAmountLocal
          ? parseInt(montoLocal) < minPromiseAmountLocal
            ? `${translations.gestion.errors.minAmount}${operation.currencySymbol}${minPromiseAmountLocal}`
            : undefined
          : undefined,
        montoExt:
          !montoExt && hasForeign
            ? translations.gestion.errors.extAmount
            : minPromiseAmountForeing
            ? parseInt(montoExt) < minPromiseAmountForeing
              ? `${translations.gestion.errors.minAmount}${operation.foreignCurrencySymbol}${minPromiseAmountForeing}`
              : undefined
            : undefined,
        date: !date ? translations.gestion.errors.paymentDate : undefined,
      };
      setErrorsInput(currentErrorsInput);

      return Object.values(currentErrorsInput).some(
        (error) => error !== undefined
      );
    };

    const getDataToSend = (): RequestOperationData => {
      let data: RequestOperationData = {
        operationId: encryptText(operation.operationId) as string,
        existPromise: encryptText(isPromise() ? "1" : "0"),
      };

      if (isPromise()) {
        const formattedMontoLocal = formatToTwoDecimals(montoLocal);
        const encryptedLocalCurrency = encryptText(
          formattedMontoLocal
        ) as string;

        data = {
          ...data,
          localCurrency: encryptedLocalCurrency,
          promiseDate: encryptText(formatDate(date)) as string,
        };

        if (hasForeign) {
          const formattedMontoExt = formatToTwoDecimals(montoExt);
          const encryptedForeignCurrency = encryptText(
            formattedMontoExt
          ) as string;

          data = {
            ...data,
            foreignCurrency: encryptedForeignCurrency,
          };
        }
      }

      return data;
    };

    // TODO DELETE It's to show data decrypt
    const getDataToSendSin = (): RequestOperationData => {
      let data: RequestOperationData = {
        operationId: operation.operationId,
        existPromise: isPromise() ? "1" : "0",
      };

      if (isPromise()) {
        const formattedMontoLocal = formatToTwoDecimals(montoLocal);

        data = {
          ...data,
          localCurrency: formattedMontoLocal,
          promiseDate: formatDate(date),
        };

        if (hasForeign) {
          const formattedMontoExt = formatToTwoDecimals(montoExt);

          data = {
            ...data,
            foreignCurrency: formattedMontoExt,
          };
        }
      }
      return data;
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
                keyboardType="numeric"
              />

              {hasForeign && (
                <CustomInput
                  label={translations.gestion.extAmount}
                  value={montoExt}
                  onChangeText={(text) => {
                    setMontoExt(text);
                    clearInputError("montoExt");
                  }}
                  placeholder="0.00"
                  isRequired
                  currency={operation.foreignCurrencySymbol}
                  errorMessage={errorsInput?.montoExt}
                  keyboardType="numeric"
                />
              )}

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
