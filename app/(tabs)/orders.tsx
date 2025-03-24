import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';

interface Order {
  id: string;
  restaurant: string;
  status: 'ongoing' | 'done';
  total: number;
  date: string;
}

// Get screen dimensions for modal sizing
const { height: screenHeight } = Dimensions.get('window');

// Order Detail Modal Component
const OrderDetailModal: React.FC<{
  isVisible: boolean;
  onClose: () => void;
  order: Order | null;
}> = ({ isVisible, onClose, order }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  if (!order) return null;

  return (
    <Modal
      animationType="slide"
      transparent={Platform.OS !== 'ios' ? true : false}
      visible={isVisible}
      onRequestClose={onClose}
      presentationStyle="pageSheet"
    >
      <View
        style={[
          styles.modalContent,
          { backgroundColor: colorScheme === 'dark' ? '#1C1C1E' : '#FFFFFF' },
        ]}
      >
        <View style={styles.modalHeader}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>
            Order Details
          </Text>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={[styles.closeText, { color: theme.tint }]}>Close</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.modalScrollView}>
          <View style={styles.modalBody}>
            <Text style={[styles.restaurantName, { color: theme.text }]}>
              {order.restaurant}
            </Text>

            <View
              style={[
                styles.detailSection,
                { borderColor: colorScheme === 'dark' ? '#38383A' : '#E5E5E5' },
              ]}
            >
              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: theme.tabIconDefault }]}
                >
                  Status
                </Text>
                <Text
                  style={[
                    styles.detailValue,
                    {
                      color:
                        order.status === 'ongoing' ? theme.tint : theme.text,
                    },
                  ]}
                >
                  {order.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: theme.tabIconDefault }]}
                >
                  Order Date
                </Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {order.date}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Text
                  style={[styles.detailLabel, { color: theme.tabIconDefault }]}
                >
                  Order ID
                </Text>
                <Text style={[styles.detailValue, { color: theme.text }]}>
                  {order.id}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.totalSection,
                { borderColor: colorScheme === 'dark' ? '#38383A' : '#E5E5E5' },
              ]}
            >
              <View style={styles.totalContainer}>
                <Text style={[styles.totalLabel, { color: theme.text }]}>
                  Total
                </Text>
                <Text style={[styles.totalValue, { color: theme.text }]}>
                  ${order.total.toFixed(2)}
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: theme.tint }]}
            >
              <Text style={styles.actionButtonText}>
                {order.status === 'ongoing' ? 'Track Order' : 'Reorder'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

// Order Card Component
const OrderCard: React.FC<Order & { onPress: () => void }> = ({
  restaurant,
  total,
  date,
  status,
  onPress,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  return (
    <TouchableOpacity
      style={[
        styles.orderCard,
        { backgroundColor: colorScheme === 'dark' ? '#2C2C2E' : '#fff' },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.restaurant, { color: theme.text }]}>
        {restaurant}
      </Text>
      <Text style={[styles.details, { color: theme.tabIconDefault }]}>
        Total: ${total.toFixed(2)}
      </Text>
      <Text style={[styles.details, { color: theme.tabIconDefault }]}>
        Date: {date}
      </Text>
      <Text
        style={[
          styles.status,
          status === 'ongoing'
            ? { color: theme.tint }
            : { color: theme.tabIconDefault },
        ]}
      >
        {status === 'ongoing' ? 'Ongoing' : 'Completed'}
      </Text>
    </TouchableOpacity>
  );
};

// Main Orders Page
export default function Orders() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Static array of orders with TypeScript typing
  const orders: Order[] = [
    {
      id: '1',
      restaurant: 'Pizza Palace',
      status: 'ongoing',
      total: 24.99,
      date: '2025-03-23',
    },
    {
      id: '2',
      restaurant: 'Sushi Stop',
      status: 'done',
      total: 35.5,
      date: '2025-03-20',
    },
    {
      id: '3',
      restaurant: 'Burger Barn',
      status: 'ongoing',
      total: 15.75,
      date: '2025-03-23',
    },
    {
      id: '4',
      restaurant: 'Taco Town',
      status: 'done',
      total: 12.0,
      date: '2025-03-19',
    },
    {
      id: '5',
      restaurant: 'Taco Bell',
      status: 'done',
      total: 12.0,
      date: '2025-03-19',
    },
    {
      id: '6',
      restaurant: 'Grill Hav',
      status: 'done',
      total: 12.0,
      date: '2025-03-19',
    },
  ];

  // Categorize orders
  const ongoingOrders = orders.filter((order) => order.status === 'ongoing');
  const doneOrders = orders.filter((order) => order.status === 'done');

  // Handle order card press
  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  return (
    <>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: colorScheme === 'dark' ? '#000' : '#F5F8FA' },
        ]}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={[styles.header, { color: theme.text }]}>Your Orders</Text>

        {/* Ongoing Orders Section */}
        {ongoingOrders.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Ongoing
            </Text>
            {ongoingOrders.map((item) => (
              <OrderCard
                key={item.id}
                id={item.id}
                restaurant={item.restaurant}
                total={item.total}
                date={item.date}
                status={item.status}
                onPress={() => handleOrderPress(item)}
              />
            ))}
          </>
        )}

        {/* Done Orders Section */}
        {doneOrders.length > 0 && (
          <>
            <Text style={[styles.sectionTitle, { color: theme.text }]}>
              Completed
            </Text>
            {doneOrders.map((item) => (
              <OrderCard
                key={item.id}
                id={item.id}
                restaurant={item.restaurant}
                total={item.total}
                date={item.date}
                status={item.status}
                onPress={() => handleOrderPress(item)}
              />
            ))}
          </>
        )}

        {/* Empty State */}
        {orders.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.tabIconDefault }]}>
            No orders yet.
          </Text>
        )}
      </ScrollView>

      {/* Add Order Detail Modal */}
      <OrderDetailModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        order={selectedOrder}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32, // Extra padding at the bottom for scrolling
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 56,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  orderCard: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  restaurant: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    marginTop: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },

  // modal
  modalContent: {
    flex: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  closeButton: {
    padding: 8,
  },
  closeText: {
    fontSize: 16,
    fontWeight: '500',
  },
  modalScrollView: {
    flex: 1,
  },
  modalBody: {
    padding: 16,
  },
  restaurantName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailSection: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  detailLabel: {
    fontSize: 16,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalSection: {
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  actionButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
